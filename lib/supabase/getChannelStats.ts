import { ChannelAccumulator, ChannelStats } from "@/types/ChannelStats";
import { CHANNELS } from "../consts";
import { supabaseClient } from "./client";

async function getChannelStats(filterChannels = false) {
  const limit = 1000;
  let offset = 0;
  const entries = {} as ChannelAccumulator;

  do {
    const query = supabaseClient
      .from('posts')
      .select('channelId, post_hash, authorFid, points')
      .range(offset, offset + limit - 1);

    if (filterChannels) {
      query.in('channelId', CHANNELS.map(channel => channel.value));
    } else {
      query.neq('channelId', null);
    }

    const { data: posts, error } = await query;

    if (error) throw error;

    posts.forEach(({ channelId, ...post }) => {
      if (!entries[channelId]) entries[channelId] = {
        uniquePosts: new Set,
        uniqueAuthors: new Set,
        notes: 0
      };

      entries[channelId].uniqueAuthors.add(post.authorFid);
      entries[channelId].uniquePosts.add(post.post_hash);
      entries[channelId].notes += post.points;
    });

    if (posts.length < limit) break;
    offset += limit;

  } while (offset);

  const channels = Object.keys(entries).map(channelId => {
    const channel: ChannelStats = {
      channelId,
      numberOfCurators: entries[channelId].uniqueAuthors.size,
      numberOfSongs: entries[channelId].uniquePosts.size,
    };
    channel.numberOfNotes = entries[channelId].notes;

    return channel;
  });

  return channels;
}

export default getChannelStats;