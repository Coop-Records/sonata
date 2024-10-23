import getVerifications from '@/lib/farcaster/getVerifications';
import getStackPoints from '@/lib/sonata/getStackPoints';
import { eventStakeChannel, eventStakeChannelFid } from '@/lib/stack/events';
import { stack } from '@/lib/stack/client';
import supabase from '@/lib/supabase/serverClient';
import getChannelTipInfo from '@/lib/sonata/tip/getChannelTipInfo';
import getFidFromToken from '@/lib/privy/getFidFromToken';
import getUserFromFid from '@/lib/farcaster/getUserFromFid';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const channelId = req.nextUrl.searchParams.get('channelId');
  const fid = Number(req.nextUrl.searchParams.get('fid'));

  try {
    if (!channelId || isNaN(fid)) throw Error('channelId and fid required');

    const verifications = await getVerifications(fid);

    const stakedAmount = -(await getStackPoints(
      verifications,
      eventStakeChannelFid(channelId, fid),
    ));

    return Response.json({ message: 'success', stakedAmount });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'failed';
    return Response.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { channelId, accessToken, amount } = await req.json();
    if (!channelId) throw Error('Channel Id required');
    if (!isFinite(amount)) throw Error('Stake amount required');
    if (!accessToken) throw Error('Access token required');
    if (amount < 0) throw Error('Invalid amount');
    const fid = await getFidFromToken(accessToken);

    const event = eventStakeChannel(channelId);
    const userEvent = eventStakeChannelFid(channelId, fid);

    const user = await getUserFromFid(fid);
    const verifications = user?.verifications;
    const userAddress = verifications?.[0];
    if (!(verifications && userAddress)) throw Error('No user address found');

    const userBalance = await getStackPoints(verifications);
    if (amount > userBalance) throw Error('No balances found');

    const info = await getChannelTipInfo(channelId, 0);
    if (!info) throw Error('could not find channel');
    const { channelAddress } = info;

    const result = await stack.trackMany([
      { event, payload: { account: channelAddress, points: amount } },
      { event: userEvent, payload: { account: userAddress, points: -amount } },
    ]);
    if (!result.success) throw Error(result.status);

    const { error } = await supabase
      .from('stake_activity_log')
      .insert({ fid, amount, channelId, channelAddress });
    if (error) console.error(error);

    return Response.json({ usedAmount: amount, remainingBalance: userBalance - amount });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Unable to stake!' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
