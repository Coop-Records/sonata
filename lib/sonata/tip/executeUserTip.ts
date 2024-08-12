import { stack } from "@/lib/stack/client";
import { eventTipCashback, eventTipChannel, eventTipRecipient } from "@/lib/stack/events";
import supabase from '@/lib/supabase/serverClient';
import getUserTipInfo from "./getUserTipInfo";

async function executeUserTip(
  postHash: string,
  {
    recipientFid: receiver = 0,
    recipientWalletAddress = '',
    tipperWalletAddress = ''
  },
  tipInfo: Awaited<ReturnType<typeof getUserTipInfo>>
) {
  const { error, data: post } = await supabase
    .from('posts')
    .select('points')
    .eq('post_hash', postHash).single();
  if (error) throw error;

  const { allowableAmount: amount, tipperFid: sender, tip, channelTip } = tipInfo;
  let receiverAmount = amount, tipperAmount = 0, channelAmount = 0;
  const stacks = [];
  const allUpdates = [];

  if (channelTip) {
    const { channelAddress, channelId } = channelTip;
    receiverAmount -= channelAmount = channelTip.channelAmount;
    stacks.push(stack.track(eventTipChannel(channelId), { account: channelAddress, points: channelAmount }));

    allUpdates.push(supabase.from('channel_tips_activity_log').insert({
      sender, amount: channelAmount, post_hash: postHash, channelId, channelAddress
    }));
  }
  if (tipperWalletAddress) {
    receiverAmount -= tipperAmount = Math.floor(Number(amount) * .1);
    stacks.push(stack.track(eventTipCashback(sender), { account: tipperWalletAddress, points: tipperAmount }));
  }
  stacks.unshift(stack.track(eventTipRecipient(receiver), { account: recipientWalletAddress, points: receiverAmount }));

  const [{ success }] = await Promise.all(stacks);
  if (!success) throw Error('Could not stack');

  const remaining_tip_allocation = tip.remaining_tip_allocation - amount;
  const totalTipOnPost = receiverAmount + post.points;

  allUpdates.push(
    supabase.from('tips').update({ remaining_tip_allocation }).eq('fid', sender),
    supabase.from('posts').update({ points: totalTipOnPost }).eq('post_hash', postHash),
    supabase.from('tips_activity_log').insert({ sender, receiver, amount: receiverAmount, post_hash: postHash })
  )
  const updates = await Promise.all(allUpdates);

  updates.map(({ error }, id) => error ? console.error({ error, id }) : undefined);

  return { tipRemaining: remaining_tip_allocation, totalTipOnPost, tipperAmount, channelAmount };
}

export default executeUserTip;
