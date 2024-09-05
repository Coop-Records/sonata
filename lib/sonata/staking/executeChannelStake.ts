import getUser from "@/lib/neynar/getNeynarUser";
import { stack } from "@/lib/stack/client";
import { eventStakeChannel, eventStakeChannelFid } from "@/lib/stack/events";
import supabase from "@/lib/supabase/serverClient";
import getPoints from "../getStackPoints";
import getChannelTipInfo from "../tip/getChannelTipInfo";

async function executeChannelStake(channelId: string, amount: number, fid: number) {
  const event = eventStakeChannel(channelId);
  const userEvent = eventStakeChannelFid(channelId, fid);

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
  results.forEach(res => { if (!res?.success) throw Error(res?.status) });

  const { error } = await supabase
    .from('stake_activity_log')
    .insert({ fid, amount, channelId, channelAddress });
  if (error) console.error('executeChannelStake', error);

  return { usedAmount: amount, remainingBalance: userBalance - amount };
}

export default executeChannelStake;
