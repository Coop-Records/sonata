import getUser from "@/lib/neynar/getNeynarUser";
import { stack } from "@/lib/stack/client";
import supabase from "@/lib/supabase/serverClient";
import getChannelTipInfo from "../tip/getChannelTipInfo";

async function executeChannelUnstake(channelId: string, amount: number, fid: number) {
  const user = await getUser(fid);
  const userAddress: string | undefined = user?.verifications?.[0];
  if (!userAddress) throw Error('No user address found');

  const info = await getChannelTipInfo(channelId, 0);
  if (!info) throw Error('could not find channel');

  const { channelAddress } = info;
  const channelStakeAmount = await stack.getPoints(channelAddress);
  if (!isFinite(channelStakeAmount) || amount > channelStakeAmount) throw Error('Invalid amount');

  const { error, data } = await supabase
    .from('stake_activity_log')
    .select('userStakeAmount:amount.sum()')
    .eq('channelId', channelId)
    .eq('fid', fid)
    .single();
  if (error) throw error;

  const { userStakeAmount } = data;
  if (!isFinite(userStakeAmount) || amount > userStakeAmount) throw Error('Invalid amount');

  const results = await Promise.all([
    stack.track(`channel_stake_from_${channelAddress}`, { account: channelAddress, points: -amount }),
    stack.track(`channel_stake_to_${fid}`, { account: userAddress, points: amount }),
  ]);
  if (results.some(res => !res.success)) throw Error('Could not stack');

  const log = await supabase
    .from('stake_activity_log')
    .insert({ fid, amount: -amount, channelId, channelAddress });
  if (log.error) console.error('executeChannelStake', log.error);

  return { unstakedAmount: amount, remainingStake: data.userStakeAmount - amount };
}

export default executeChannelUnstake;
