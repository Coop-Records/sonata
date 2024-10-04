'use server';
import getUser from '@/lib/neynar/getNeynarUser';
import { stack } from '@/lib/stack/client';
import { eventStakeChannel, eventStakeChannelFid } from '@/lib/stack/events';
import supabase from '@/lib/supabase/serverClient';
import getPoints from '../getStackPoints';
import getChannelTipInfo from '../tip/getChannelTipInfo';
import { ChannelStakeParams } from '@/types/ChannelStakeParams';
import getFidFromToken from '@/lib/privy/getFidFromToken';

async function executeChannelUnstake({ channelId, amount, accessToken }: ChannelStakeParams) {
  if (!channelId) throw Error('Channel Id required');
  if (!isFinite(amount)) throw Error('Amount required');
  if (!accessToken) throw Error('Access token required');

  const fid = await getFidFromToken(accessToken);
  const event = eventStakeChannel(channelId);
  const userEvent = eventStakeChannelFid(channelId, fid);

  const user = await getUser(fid);
  const userAddress: string = user?.verifications?.[0];
  if (!userAddress) throw Error('No user address found');

  const info = await getChannelTipInfo(channelId, 0);
  if (!info) throw Error('could not find channel');

  const { channelAddress } = info;

  const userStakeAmount = Math.abs(await getPoints(user.verifications, userEvent));

  if (amount > userStakeAmount) throw Error('Invalid amount');

  const results = await Promise.all([
    stack.track(event, { account: channelAddress, points: -amount }),
    stack.track(userEvent, { account: userAddress, points: amount }),
  ]);
  results.forEach((res) => {
    if (!res?.success) throw Error(res?.status);
  });

  const log = await supabase
    .from('stake_activity_log')
    .insert({ fid, amount: -amount, channelId, channelAddress });
  if (log.error) console.error('executeChannelStake', log.error);

  return { unstakedAmount: amount, remainingStake: userStakeAmount - amount };
}

export default executeChannelUnstake;
