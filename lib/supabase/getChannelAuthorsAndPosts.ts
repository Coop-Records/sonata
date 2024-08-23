import { ChannelAccumulator } from "@/types/ChannelStats";
import { CHANNELS } from "../consts";
import supbase from "./serverClient";

async function getChannelAuthorsAndPosts(filterChannels = false, fid?: string) {
  const limit = 1000;
  let offset = 0;
  const entries = {} as ChannelAccumulator;

  do {
    const query = supbase
      .from('posts')
      .select('channelId, post_hash, authorFid')
      .range(offset, offset + limit - 1);

    if (fid) query.eq('author->fid', fid).neq('author', null);

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
      };

      entries[channelId].uniqueAuthors.add(post.authorFid);
      entries[channelId].uniquePosts.add(post.post_hash);
    });

    if (posts.length < limit) break;
    offset += limit;

  } while (offset);

  return entries;
}

export default getChannelAuthorsAndPosts;