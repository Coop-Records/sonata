import getUser from "@/lib/neynar/getNeynarUser";
import { stack } from "@/lib/stack/client";
import supabase from "@/lib/supabase/serverClient";
import getChannelTipInfo from "../tip/getChannelTipInfo";

async function executeChannelStake(channelId: string, stakeAmount: number, fid: number) {
  const user = await getUser(fid);

  const balances: { amount: number }[] = await stack.getPoints(
    user.verifications.map((verification: string) => verification)
  );
  const currentBalance = balances.reduce((prev, curr) => prev + curr.amount, 0);

  const amount = Math.min(currentBalance, stakeAmount);

  const info = await getChannelTipInfo(channelId, 0);
  if (!info) throw Error('could not find channel');

  const { channelAddress } = info;

  const { success } = await stack.track(
    `channel_stake_from_${fid}`,
    { account: channelAddress, points: amount }
  );
  if (!success) throw Error('Could not stack');

  const { error } = await supabase
    .from('stake_activity_log')
    .insert({ fid, amount, channelId, channelAddress });
  if (error) console.error('executeChannelStake', error);

  return { usedAmount: amount, remainingBalance: currentBalance - amount };
}

export default executeChannelStake;
