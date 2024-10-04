'use server';
import { stack } from '@/lib/stack/client';
import { eventStakeChannel, eventStakeChannelFid } from '@/lib/stack/events';
import supabase from '@/lib/supabase/serverClient';
import getPoints from '../getStackPoints';
import getChannelTipInfo from '../tip/getChannelTipInfo';
import getFidFromToken from '@/lib/privy/getFidFromToken';
import getUserFromFid from '@/lib/farcaster/getUserFromFid';
import { ChannelStakeParams } from '@/types/ChannelStakeParams';

async function executeChannelStake({ channelId, amount, accessToken }: ChannelStakeParams) {
  if (!channelId) throw Error('Channel Id required');
  if (!isFinite(amount)) throw Error('Stake amount required');
  if (!accessToken) throw Error('Access token required');

  const fid = await getFidFromToken(accessToken);

  const event = eventStakeChannel(channelId);
  const userEvent = eventStakeChannelFid(channelId, fid);

  const user = await getUserFromFid(fid);
  const verifications = user?.verifications;
  const userAddress = verifications?.[0];
  if (!(verifications && userAddress)) throw Error('No user address found');

  const userBalance = await getPoints(verifications);
  if (amount > userBalance) throw Error('No balances found');

  const info = await getChannelTipInfo(channelId, 0);
  if (!info) throw Error('could not find channel');
  const { channelAddress } = info;

  const results = await Promise.all([
    stack.track(event, { account: channelAddress, points: amount }),
    stack.track(userEvent, { account: userAddress, points: -amount }),
  ]);
  results.forEach((res) => {
    if (!res?.success) throw Error(res?.status);
  });

  const { error } = await supabase
    .from('stake_activity_log')
    .insert({ fid, amount, channelId, channelAddress });
  if (error) console.error('executeChannelStake', error);

  return { usedAmount: amount, remainingBalance: userBalance - amount };
}

export default executeChannelStake;
