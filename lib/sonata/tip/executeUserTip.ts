'use server';
import { stack } from '@/lib/stack/client';
import { eventTipCashback, eventTipChannel, eventTipRecipient } from '@/lib/stack/events';
import supabase from '@/lib/supabase/serverClient';
import getCastByHash from '@/lib/supabase/getPostByHash';
import getAllowance from '@/lib/supabase/getAllowance';
import getChannelTipInfo from '@/lib/sonata/tip/getChannelTipInfo';
import { isNil } from 'lodash';
import { EventPayloadWithEvent } from '@stackso/js-core';
import getVerifications from '@/lib/farcaster/getVerifications';

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

  if (!tipperFid) throw Error('Invalid user');

  const [post, balanceData] = await Promise.all([getCastByHash(postHash), getAllowance(tipperFid)]);

  const recipientFid = post.author.fid;
  if (tipperFid === recipientFid) throw Error('Can not tip yourself');
  const channelId = post.channelId;

  const allowedTip = Math.min(
    balanceData.remaining_tip_allocation,
    balanceData.daily_tip_allocation,
  );

  if (amount > allowedTip) throw Error('Insufficient allowance');

  let receiverAmount = amount,
    tipperAmount = 0,
    channelAmount = 0;
  const stackEvents: EventPayloadWithEvent[] = [];
  const allUpdates = [];

  const channelTip = await getChannelTipInfo(channelId, amount);
  if (channelTip) {
    const { channelAddress, channelId } = channelTip;
    receiverAmount -= channelAmount = channelTip.channelAmount;
    stackEvents.push({
      event: eventTipChannel(channelId),
      payload: { account: channelAddress, points: channelAmount },
    });

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
  const [senderVerifications, receiverVerifications] = await Promise.all([
    getVerifications(tipperFid),
    getVerifications(recipientFid),
  ]);

  if (isNil(receiverVerifications)) throw Error('Invalid recipient');
  if (isNil(senderVerifications)) throw Error('Invalid sender');
  const recipientWalletAddress = receiverVerifications[0];
  if (!recipientWalletAddress) throw Error('Invalid recipient');
  const tipperWalletAddress = senderVerifications[0];
  if (tipperWalletAddress) {
    receiverAmount -= tipperAmount = Math.floor(Number(amount) * 0.1);
    stackEvents.push({
      event: eventTipCashback(tipperFid),
      payload: { account: tipperWalletAddress, points: tipperAmount },
    });
  }

  stackEvents.push({
    event: eventTipRecipient(recipientFid),
    payload: { account: recipientWalletAddress, points: receiverAmount },
  });

  const result = await stack.trackMany(stackEvents);
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

  return {
    tipRemaining: remaining_tip_allocation,
    totalTipOnPost,
    tipperAmount,
    channelAmount,
    post,
    dailyAllowance: balanceData.daily_tip_allocation,
  };
}

export default executeUserTip;
