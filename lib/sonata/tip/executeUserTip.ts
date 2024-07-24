import { stack } from "@/lib/stack/client";
import supabase from '@/lib/supabase/serverClient';
import getUserTipInfo from "./getUserTipInfo";

type Fg = { recipientFid: number, recipientWalletAddress: string, tipperWalletAddress?: string };
async function executeUserTip(
  postHash: string,
  { recipientFid: receiver, recipientWalletAddress, tipperWalletAddress }: Fg,
  tipInfo: Awaited<ReturnType<typeof getUserTipInfo>>
) {
  const { error, data: post } = await supabase
    .from('posts')
    .select('points')
    .eq('post_hash', postHash).single();
  if (error) throw error;

  const { allowableAmount: amount, tipperFid: sender, tip, channelTip } = tipInfo;
  let receiverAmount = amount;
  const stacks = [];
  const allUpdates = [];

  if (channelTip) {
    const { channelAddress, channelAmount, channelId } = channelTip;
    stacks.push(stack.track(`channel_tip_${channelId}`, { account: channelAddress, points: channelAmount }));
    receiverAmount = amount - channelAmount;
    allUpdates.push(supabase
      .from('channel_tips_activity_log')
      .insert({ sender, amount: channelAmount, post_hash: postHash, channelId, channelAddress })
    );
  }
  if (tipperWalletAddress) {
    const tipperAmount = Math.floor(Number(amount) * .1);
    receiverAmount = amount - tipperAmount;
    stacks.push(stack.track(`tip_cashback_${sender}`, { account: tipperWalletAddress, points: tipperAmount }));
  }
  stacks.unshift(stack.track(`tip_recipient_${receiver}`, { account: recipientWalletAddress, points: receiverAmount }));

  const [{ success }] = await Promise.all(stacks);
  if (!success) throw Error('Could not stack');

  const remaining_tip_allocation = tip.remaining_tip_allocation - amount;
  const daily_tip_allocation = tip.daily_tip_allocation - amount;
  const totalTipOnPost = receiverAmount + post.points;

  allUpdates.push(
    supabase.from('tips').update({ remaining_tip_allocation, daily_tip_allocation }).eq('fid', sender),
    supabase.from('posts').update({ points: totalTipOnPost }).eq('post_hash', postHash),
    supabase.from('tips_activity_log').insert({ sender, receiver, amount: receiverAmount, post_hash: postHash })
  )
  const updates = await Promise.all(allUpdates);

  updates.map(({ error }, id) => error ? console.error({ error, id }) : undefined);

  return { tipRemaining: daily_tip_allocation, totalTipOnPost };
}

export default executeUserTip;
