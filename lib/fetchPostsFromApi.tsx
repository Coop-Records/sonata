import { FeedFilter } from '@/types/Feed';

const fetchPostsFromApi = async (feedType: string, filter: FeedFilter, fid?: number) => {
  const params = new URLSearchParams({
    feedType,
    viewerFid: fid?.toString() || '',
    channelId: filter.channel || '',
  });

  const response = await fetch(`/api/feed?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch posts');

  const { posts } = await response.json();
  return posts;
};

export default fetchPostsFromApi;
