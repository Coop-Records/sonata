import getStackPoints from '@/lib/sonata/getStackPoints';
import { eventStakeChannel, eventStakeChannelFid } from '@/lib/stack/events';
import { stack } from '@/lib/stack/client';
import supabase from '@/lib/supabase/serverClient';
import getChannelTipInfo from '@/lib/sonata/tip/getChannelTipInfo';
import getFidFromToken from '@/lib/privy/getFidFromToken';
import { NextRequest } from 'next/server';
import getVerifications from '@/lib/farcaster/getVerifications';

export async function POST(req: NextRequest) {
  try {
    const { channelId, accessToken, amount } = await req.json();
    if (!channelId) throw Error('Channel Id required');
    if (!isFinite(amount)) throw Error('Amount required');
    if (!accessToken) throw Error('Access token required');
    if (amount < 0) throw Error('Invalid amount');

    const fid = await getFidFromToken(accessToken);
    const verifications = await getVerifications(fid);
    const event = eventStakeChannel(channelId);
    const userStakeEvent = eventStakeChannelFid(channelId, fid);

    const userAddress = verifications[0];
    if (!userAddress) throw Error('No user address found');

    const info = await getChannelTipInfo(channelId, 0);
    if (!info) throw Error('could not find channel');

    const { channelAddress } = info;

    const userStakeAmount = -(await getStackPoints(verifications, userStakeEvent));

    if (amount > userStakeAmount) throw Error('Invalid amount');

    const result = await stack.trackMany([
      { event, payload: { account: channelAddress, points: -amount } },
      { event: userStakeEvent, payload: { account: userAddress, points: amount } },
    ]);
    if (!result?.success) throw Error(result?.status);

    const log = await supabase
      .from('stake_activity_log')
      .insert({ fid, amount: -amount, channelId, channelAddress });
    if (log.error) console.error('executeChannelUnstake', log.error);

    return Response.json({ unstakedAmount: amount, remainingStake: userStakeAmount - amount });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Unable to stake!' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
