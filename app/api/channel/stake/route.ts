import executeChannelStake from '@/lib/sonata/staking/executeChannelStake';
import getUserTipInfo from '@/lib/sonata/tip/getUserTipInfo';
import supabase from "@/lib/supabase/serverClient";
import { NextRequest } from 'next/server';

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
  try {
    const { signer_uuid, amount: stakeAmount, channelId } = await req.json();
    if (!channelId) throw Error('channelId required');

    const data = await executeChannelStake(
      await getUserTipInfo(signer_uuid, stakeAmount, channelId)
    );

    return Response.json({ message: `Staked ${data.usedAmount} NOTES`, ...data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message, usedAmount: 0 }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
