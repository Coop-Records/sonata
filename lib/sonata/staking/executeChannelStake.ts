import getUser from "@/lib/neynar/getNeynarUser";
import { stack } from "@/lib/stack/client";
import supabase from "@/lib/supabase/serverClient";
import getChannelTipInfo from "../tip/getChannelTipInfo";
import getPoints from "../getStackPoints";

async function executeChannelStake(channelId: string, amount: number, fid: number) {
  const event = `channel_stake_${channelId}`;
  const userEvent = `channel_stake_${channelId}_${fid}`;

  const user = await getUser(fid);
  const userAddress: string = user?.verifications?.[0];
  if (!userAddress) throw Error('No user address found');

  const userBalance = await getPoints(user.verifications);
  if (amount > userBalance) throw Error('No balances found');

  const info = await getChannelTipInfo(channelId, 0);
  if (!info) throw Error('could not find channel');
  const { channelAddress } = info;

  const results = await Promise.all([
    stack.track(event, { account: channelAddress, points: amount }),
    stack.track(userEvent, { account: userAddress, points: -amount }),
  ]);
  results.forEach(res => { if (!res.success) throw Error(res.status) });

  const { error } = await supabase
    .from('stake_activity_log')
    .insert({ fid, amount, channelId, channelAddress });
  if (error) console.error('executeChannelStake', error);

  return { usedAmount: amount, remainingBalance: userBalance - amount };
}

export default executeChannelStake;
