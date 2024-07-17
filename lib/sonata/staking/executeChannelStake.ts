import { stack } from "@/lib/stack/client";
import supabase from "@/lib/supabase/serverClient";
import getUserTipInfo from "../tip/getUserTipInfo";

async function executeChannelStake(info: Awaited<ReturnType<typeof getUserTipInfo>>) {
  if (!info.channelTip) throw Error('Could not find channel');

  const { tip, tipperFid, allowableAmount: amount } = info;
  const { channelAddress, channelId } = info.channelTip;

  const { success } = await stack.track(
    `channel_stake_from_${tipperFid}`,
    { account: channelAddress, points: amount }
  );
  if (!success) throw Error('Could not stack');

  const daily_tip_allocation = tip.daily_tip_allocation - amount;
  const remaining_tip_allocation = tip.remaining_tip_allocation - amount;

  const updates = await Promise.all([
    supabase.from('tips').update({ remaining_tip_allocation, daily_tip_allocation }).eq('fid', tipperFid),
    supabase.from('stake_activity_log').insert({ fid: tipperFid, amount, channelId, channelAddress }),
  ]);
  updates.map(({ error }, id) => error ? console.error({ error, id }) : undefined);

  return { usedAmount: amount, dailyAmountRemaining: daily_tip_allocation };
}

export default executeChannelStake;
