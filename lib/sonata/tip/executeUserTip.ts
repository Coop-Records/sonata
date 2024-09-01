import { stack } from '@/lib/stack/client';
import { eventTipCashback, eventTipChannel, eventTipRecipient } from '@/lib/stack/events';
import supabase from '@/lib/supabase/serverClient';
import getCastByHash from '@/lib/supabase/getPostByHash';
import getChannelTipInfo from './getChannelTipInfo';
import getBulkUsersByFid from '@/lib/neynar/getBulkUsersByFid';
import getAllowance from '@/lib/supabase/getAllowance';
import marketHook from './marketHook';

async function executeUserTip({
  postHash,
  tipperFid,
  amount,
}: {
  postHash: string;
  tipperFid: number;
  amount: number;
}) {
  if (isNaN(amount)) throw Error('Amount must be a number');
  if (amount <= 0) throw Error('Invalid amount');

  const post = await getCastByHash(postHash);
  const recipientFid = post.authorFid;
  if (tipperFid === recipientFid) throw Error('Can not tip yourself');
  const channelId = post.channelId;

  const balanceData = await getAllowance(tipperFid);

  const allowedTip = Math.min(
    balanceData.remaining_tip_allocation,
    balanceData.daily_tip_allocation,
  );

  if (amount > allowedTip) throw Error('Insufficient allowance');

  let receiverAmount = amount,
    tipperAmount = 0,
    channelAmount = 0;
  const stacks = [];
  const allUpdates = [];

  const channelTip = await getChannelTipInfo(channelId, amount);
  if (channelTip) {
    const { channelAddress, channelId } = channelTip;
    receiverAmount -= channelAmount = channelTip.channelAmount;
    stacks.push(
      stack.track(eventTipChannel(channelId), { account: channelAddress, points: channelAmount }),
    );

    allUpdates.push(
      supabase.from('channel_tips_activity_log').insert({
        sender: tipperFid,
        amount: channelAmount,
        post_hash: postHash,
        channelId,
        channelAddress,
      }),
    );
  }

  const [sender, receiver] = await getBulkUsersByFid([tipperFid, recipientFid]);
  const recipientWalletAddress = receiver?.verifications?.find(Boolean);
  if (!recipientWalletAddress) throw Error('Invalid recipient');
  const tipperWalletAddress = sender?.verifications?.find(Boolean);
  if (tipperWalletAddress) {
    receiverAmount -= tipperAmount = Math.floor(Number(amount) * 0.1);
    stacks.push(
      stack.track(eventTipCashback(tipperFid), {
        account: tipperWalletAddress,
        points: tipperAmount,
      }),
    );
  }

  stacks.unshift(
    stack.track(eventTipRecipient(recipientFid), {
      account: recipientWalletAddress,
      points: receiverAmount,
    }),
  );

  const [result] = await Promise.all(stacks);
  if (!result?.success) throw Error('Could not stack');

  const remaining_tip_allocation = balanceData.remaining_tip_allocation - amount;
  const totalTipOnPost = receiverAmount + (post.points ?? 0);

  allUpdates.push(
    supabase.from('tips').update({ remaining_tip_allocation }).eq('fid', tipperFid),
    supabase.from('posts').update({ points: totalTipOnPost }).eq('post_hash', post.post_hash),
    supabase.from('tips_activity_log').insert({
      sender: tipperFid,
      receiver: recipientFid,
      amount: receiverAmount,
      post_hash: postHash,
    }),
  );
  const updates = await Promise.all(allUpdates);

  updates.map(({ error }, id) => (error ? console.error({ error, id }) : undefined));

  console.log("SWEETS marketHook", post)
  await marketHook(post);
  
  return {
    tipRemaining: remaining_tip_allocation,
    totalTipOnPost,
    tipperAmount,
    channelAmount,
    post,
    sender,
    receiver,
    dailyAllowance: balanceData.daily_tip_allocation,
  };
}

export default executeUserTip;
