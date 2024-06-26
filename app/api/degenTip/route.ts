import postDegenTipComment from '@/lib/neynar/postDegenTipComment';
import verifySignerUUID from '@/lib/neynar/verifySigner';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { signer_uuid, tipAmount, postHash } = body;

  const verify = await verifySignerUUID(signer_uuid);

  if (!verify.status) {
    return NextResponse.json(
      { message: 'Invalid Signer UUID', tipRemaining: 0, totalTipOnPost: 0 },
      { status: 400 },
    );
  }

  const totalDegenOnPost = await callAllocateDegenTip(tipAmount, postHash);

  await postDegenTipComment(signer_uuid, tipAmount, postHash);

  return NextResponse.json(
    {
      message: `Tipped ${tipAmount} DEGEN`,
      usedTip: tipAmount,
      totalTipOnPost: totalDegenOnPost,
    },
    { status: 200 },
  );
};

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

async function callAllocateDegenTip(tipAmount: number, postHashInput: string) {
  const { data, error } = await supabase.rpc('degen_tip_post', {
    tip_amount: tipAmount,
    post_hash_input: postHashInput,
  });

  if (error) {
    console.error('Error calling function:', error);
    return null;
  }

  console.log('Function returned:', data);
  return data;
}

export const dynamic = 'force-dynamic';
