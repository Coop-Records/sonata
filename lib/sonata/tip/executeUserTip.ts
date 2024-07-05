import { stack } from "@/lib/stack/client";
import supabase from '@/lib/supabase/serverClient';
import getUserTipInfo from "./getUserTipInfo";

async function executeUserTip(
  postHash: string,
  { recipientFid: receiver, recipientWalletAddress }: any,
  tipInfo: Awaited<ReturnType<typeof getUserTipInfo>>
) {
  const { error, data: post } = await supabase
    .from('posts')
    .select('points')
    .eq('post_hash', postHash).single();
  if (error) throw error;

  const { allowableAmount: amount, tipperFid: sender, tip, channelTip } = tipInfo;
  let receiverAmount = amount;
  const stackCalls = [];

  if (channelTip) {
    const { channelAddress, channelAmount } = channelTip;
    stackCalls.push(stack.track(`channel_tip_from_${sender}`, { account: channelAddress, points: channelAmount }));
    receiverAmount = amount - channelAmount;
  }
  stackCalls.unshift(stack.track(`tip_from_${sender}`, { account: recipientWalletAddress, points: receiverAmount }));

  const [{ success }] = await Promise.all(stackCalls);
  if (!success) throw Error('Could not stack');

  const remaining_tip_allocation = tip.remaining_tip_allocation - amount;
  const daily_tip_allocation = tip.daily_tip_allocation - amount;
  const totalTipOnPost = receiverAmount + post.points;

  const updates = await Promise.all([
    supabase.from('tips').update({ remaining_tip_allocation, daily_tip_allocation }).eq('fid', sender),
    supabase.from('posts').update({ points: totalTipOnPost }).eq('post_hash', postHash),
    supabase.from('tips_activity_log').insert({ sender, receiver, amount: receiverAmount, postHash }),
  ]);

  console.log('updateErrors:', updates.map(({ error }, id) => ({ error, id })));

  return { tipRemaining: daily_tip_allocation, totalTipOnPost };
}

export default executeUserTip;
