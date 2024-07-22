import getUser from "@/lib/neynar/getNeynarUser";
import { stack } from "@/lib/stack/client";
import supabase from "@/lib/supabase/serverClient";
import getChannelTipInfo from "../tip/getChannelTipInfo";
import getPoints from "../getStackPoints";

async function executeChannelUnstake(channelId: string, amount: number, fid: number) {
  const event = `channel_stake_${channelId}`;
  const userEvent = `channel_stake_${channelId}_${fid}`;

  const user = await getUser(fid);
  const userAddress: string = user?.verifications?.[0];
  if (!userAddress) throw Error('No user address found');

  const info = await getChannelTipInfo(channelId, 0);
  if (!info) throw Error('could not find channel');

  const { channelAddress } = info;

  const userStakeAmount = -await getPoints(user.verifications, userEvent);

  if (amount > userStakeAmount) throw Error('Invalid amount');

  const results = await Promise.all([
    stack.track(event, { account: channelAddress, points: -amount }),
    stack.track(userEvent, { account: userAddress, points: amount }),
  ]);
  results.forEach(res => { if (!res.success) throw Error(res.status) });

  const log = await supabase
    .from('stake_activity_log')
    .insert({ fid, amount: -amount, channelId, channelAddress });
  if (log.error) console.error('executeChannelStake', log.error);

  return { unstakedAmount: amount, remainingStake: userStakeAmount - amount };
}

export default executeChannelUnstake;
