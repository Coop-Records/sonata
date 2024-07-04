import getUserTipInfo from '@/lib/sonata/tip/getUserTipInfo';
import { stack } from '@/lib/stack/client';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getResponse = async (req: NextRequest) => {
  const referer = req.headers.get('referer') ?? '';
  const { signer_uuid, tipAmount } = await req.json();

  const { allowableAmount: amount, channelTip, tip, tipperFid } =
    await getUserTipInfo(signer_uuid, tipAmount, referer);

  if (!channelTip) throw Error('Could not find channel');

  const { channelAddress, channelId } = channelTip;
  await stack.track(`channel_stake_from_${tipperFid}`, { account: channelAddress, points: amount });

  const daily_tip_allocation = tip.daily_tip_allocation - amount;
  const remaining_tip_allocation = tip.remaining_tip_allocation - amount;

  supabase.from('tips').update({ remaining_tip_allocation, daily_tip_allocation }).eq('fid', tipperFid);
  supabase.from('stake_activity_log').insert({ fid: tipperFid, amount, channelId, channelAddress });

  return NextResponse.json(
    { message: `Staked ${amount} NOTES`, usedTip: amount, tipRemaining: daily_tip_allocation }
  );
};

export async function POST(req: NextRequest) {
  return getResponse(req).catch(error => {
    const message = error instanceof Error ? error.message : 'Failed';
    return NextResponse.json({ message, usedTip: 0 }, { status: 400 });
  });
}

export const dynamic = 'force-dynamic';
