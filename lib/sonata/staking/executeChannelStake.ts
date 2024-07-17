import getUser from "@/lib/neynar/getNeynarUser";
import { stack } from "@/lib/stack/client";
import supabase from "@/lib/supabase/serverClient";
import getChannelTipInfo from "../tip/getChannelTipInfo";

async function executeChannelStake(channelId: string, stakeAmount: number, fid: number) {
  const user = await getUser(fid);
  if (!user?.verifications?.[0]) throw Error('No user address found');

  const balances: { amount: number; address: string }[] = await stack.getPoints(
    user.verifications.map((verification: string) => verification)
  );
  const balance = balances.find(balance => balance.amount >= stakeAmount);
  if (!balance) throw Error('No balances found');

  const amount = Math.min(balance.amount, stakeAmount);

  const info = await getChannelTipInfo(channelId, 0);
  if (!info) throw Error('could not find channel');

  const { channelAddress } = info;

  const results = await Promise.all([
    stack.track(`channel_stake_from_${fid}`, { account: balance.address, points: -amount }),
    stack.track(`channel_stake_on_${channelAddress}`, { account: channelAddress, points: amount }),
  ]);
  if (results.some(res => !res.success)) throw Error('Could not stack');

  const { error } = await supabase
    .from('stake_activity_log')
    .insert({ fid, amount, channelId, channelAddress });
  if (error) console.error('executeChannelStake', error);

  return { usedAmount: amount, remainingBalance: balance.amount - amount };
}

export default executeChannelStake;
