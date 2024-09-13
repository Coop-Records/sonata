import { CHANNELS } from '../consts';
import getChannelAuthorsAndPosts from './getChannelAuthorsAndPosts';
import supabase from './serverClient';

type TipsAccumulator = {
  tipsCount: number;
  tipsTotal: number;
  receivedTipsCount: number;
  receivedTipsTotal: number;
};

async function getFidChannelStats(fid = '') {
  const entries = await getChannelAuthorsAndPosts(true, fid);

  const { data, error } = await supabase
    .from('tips_activity_with_channel_log')
    .select('amount,sender,receiver,channel_id')
    .in(
      'channel_id',
      CHANNELS.map((channel) => channel.value),
    )
    .or(`sender.eq.${fid},receiver.eq.${fid}`)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const accumulator = data.reduce(
    (prev, curr) => {
      if (!prev[curr.channel_id])
        prev[curr.channel_id] = {
          tipsCount: 0,
          tipsTotal: 0,
          receivedTipsCount: 0,
          receivedTipsTotal: 0,
        };

      if (curr.receiver === fid) {
        prev[curr.channel_id].receivedTipsCount += 1;
        prev[curr.channel_id].receivedTipsTotal += curr.amount;
      } else {
        prev[curr.channel_id].tipsCount += 1;
        prev[curr.channel_id].tipsTotal += curr.amount;
      }

      return prev;
    },
    {} as Record<string, TipsAccumulator>,
  );

  const channels = Object.keys(entries).map((channelId) => {
    const channel = {
      channelId,
      numberOfSongs: entries[channelId].uniquePosts.size,
      ...(accumulator[channelId] ?? {}),
    };
    return channel;
  });

  return channels;
}

export default getFidChannelStats;
