import fetchPosts from '@/lib/supabase/fetchPosts';
import { supabaseClient } from '@/lib/supabase/client';
import findValidEmbed from '@/lib/findValidEmbed';
import { FeedType, FeedFilter } from '@/types/Feed';

export async function getFeed(
  channelId?: string | null,
  feedType: FeedType = FeedType.Trending,
  viewerFid?: number,
) {
  const filter: FeedFilter = {};
  if (channelId) {
    filter.channel = channelId;
  }

  const { posts } = await fetchPosts(supabaseClient, filter, feedType, 0, viewerFid, 0, false);

  const filteredPosts = posts.filter((post: any) => {
    if (channelId && !(post.channelId && post.channelId.includes(channelId))) {
      return false;
    }

    const validEmbed = findValidEmbed(post);
    return !!validEmbed;
  });

  return filteredPosts;
}
