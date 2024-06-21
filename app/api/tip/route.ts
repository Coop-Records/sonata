import getUser from '@/lib/neynar/getNeynarUser';
import verifySignerUUID from '@/lib/neynar/verifySigner';
import { stack } from '@/lib/stack/client';
import { supabaseClient as supabase } from '@/lib/supabase/client';
import { isEmpty, isNil } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { signer_uuid, tipAmount, postHash, recipientFid } = body;

  const { status, fid: tipperFid } = await verifySignerUUID(signer_uuid);

  if (!status) {
    return NextResponse.json(
      { message: `Invalid Signer UUID`, tipRemaining: 0, totalTipOnPost: 0 },
      { status: 400 },
    );
  }

  if (tipperFid == recipientFid) {
    return NextResponse.json(
      { message: `Can not tip yourself`, tipRemaining: 0, totalTipOnPost: 0 },
      { status: 400 },
    );
  }

  const { count } = await supabase
    .from('tips_activity_log')
    .select('post_hash')
    .eq('sender', `${tipperFid}`)
    .eq('post_hash', postHash);

  if (count) return NextResponse.json(
    { message: 'Cannot tip again.' },
    { status: 400 },
  );

  const { remaining_tip_allocation, total_tip_on_post, used_tip } = await callAllocateTip(
    `${tipperFid}`,
    tipAmount,
    postHash,
    `${recipientFid}`,
  );

  if (used_tip === 0) {
    return NextResponse.json(
      {
        message: `Already reached max NOTES tips`,
        usedTip: used_tip,
        tipRemaining: remaining_tip_allocation,
        totalTipOnPost: total_tip_on_post,
      },
      { status: 200 },
    );
  }

  const recipientUser = await getUser(recipientFid);
  const recipientWalletAddress = !isEmpty(recipientUser.verifications)
    ? recipientUser.verifications[0]
    : undefined;

  if (isNil(recipientWalletAddress)) {
    return NextResponse.json(
      { message: `Invalid recipient`, tipRemaining: 0, totalTipOnPost: 0 },
      { status: 400 },
    );
  }

  const { success } = await stack.track(
    `tip_from_${tipperFid}`,
    { account: recipientWalletAddress, points: tipAmount }
  );

  if (success) await supabase.from('tips_activity_log').upsert(
    {
      post_hash: postHash,
      amount: tipAmount,
      created_at: new Date(),
      sender: `${tipperFid}`,
      receiver: recipientFid,
    },
    {
      onConflict: 'post_hash',
    },
  );

  return NextResponse.json(
    {
      message: `Tipped ${used_tip} NOTES`,
      usedTip: used_tip,
      tipRemaining: remaining_tip_allocation,
      totalTipOnPost: total_tip_on_post,
    },
    { status: 200 },
  );
};

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

async function callAllocateTip(
  fidInput: string,
  tipAmount: number,
  postHashInput: string,
  recipientFid: string,
) {
  const { data, error } = await supabase.rpc('allocate_tip_with_fid_recipient', {
    fid_input: fidInput,
    tip_amount: tipAmount,
    post_hash_input: postHashInput,
    receiver_fid: recipientFid,
  });

  if (error) {
    console.error('Error calling function:', error);
    return null;
  }

  console.log('Function returned:', data);
  return data;
}

export const dynamic = 'force-dynamic';
