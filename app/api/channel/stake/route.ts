import getUserTipInfo from '@/lib/sonata/tip/getUserTipInfo';
import { stack } from '@/lib/stack/client';
import supabase from "@/lib/supabase/serverClient";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const channelId = req.nextUrl.searchParams.get('channelId');
  const fid = req.nextUrl.searchParams.get('fid');

  try {
    if (!channelId || !fid) throw Error('channelId and fid required');

    const { error, data } = await supabase
      .from('stake_activity_log')
      .select('stakedAmount:amount.sum()')
      .eq('fid', fid)
      .eq('channelId', channelId)
      .single();

    if (error) throw error;

    return Response.json({ message: 'success', ...data });
  } catch (error) {
    return Response.json({ message: 'failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const referer = req.headers.get('referer') ?? '';

  try {
    const { signer_uuid, amount: stakeAmount } = await req.json();

    const { allowableAmount: amount, channelTip, tip, tipperFid } =
      await getUserTipInfo(signer_uuid, stakeAmount, referer);

    if (!channelTip) throw Error('Could not find channel');

    const { channelAddress, channelId } = channelTip;
    const { success } =
      await stack.track(`channel_stake_from_${tipperFid}`, { account: channelAddress, points: amount });

    if (!success) throw Error('Could not stack');

    const daily_tip_allocation = tip.daily_tip_allocation - amount;
    const remaining_tip_allocation = tip.remaining_tip_allocation - amount;

    const updates = await Promise.all([
      supabase.from('tips').update({ remaining_tip_allocation, daily_tip_allocation }).eq('fid', tipperFid),
      supabase.from('stake_activity_log').insert({ fid: tipperFid, amount, channelId, channelAddress }),
    ]);
    updates.map(({ error }, id) => error ? console.error({ error, id }) : undefined);

    return NextResponse.json(
      { message: `Staked ${amount} NOTES`, usedAmount: amount, dailyAmountRemaining: daily_tip_allocation }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return NextResponse.json({ message, usedAmount: 0 }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
