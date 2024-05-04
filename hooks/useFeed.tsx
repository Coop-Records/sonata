import { useCallback, useEffect, useState } from 'react';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import { FeedType, useFeedProvider } from '@/providers/FeedProvider';

const useFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);
  const { supabaseClient } = useSupabaseProvider();
  const { feedType, filter } = useFeedProvider();

  const fetchAndUpdatePoints = async (postHash: string) => {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('points,degen')
      .eq('post_hash', postHash)
      .single();

    if (error) {
      console.error('Error fetching points for post:', error);
      return;
    }

    if (data) {
      setFeed((currentFeed) =>
        currentFeed.map((post) => {
          if (post.hash === postHash) {
            return { ...post, points: data.points, degen: data.degen };
          }
          return post;
        }),
      );
    }
  };

  const fetchPoints = async (start: number) => {
    const query = supabaseClient.from('posts').select('*').not('likes', 'is', null);

    if (filter?.platform) {
      query.eq('platform', filter.platform);
    }

    if (filter?.channel) {
      query.like('parent_url', `%${filter.channel}%`);
    }

    if (feedType == FeedType.Recent) {
      query.order('created_at', { ascending: false });
    } else {
      query.order('likes', { ascending: false });
    }

    query.range(start, start + 5);

    const { data: posts } = await query.returns();

    return {
      posts,
      pointsMap: posts?.reduce(
        (
          acc: { [x: string]: any },
          item: { post_hash: string | number; points: any; degen: any },
        ) => {
          acc[item.post_hash] = { points: item.points, degen: item.degen }; // Store both points and degen
          return acc;
        },
        {},
      ),
    };
  };

  const getFeed = useCallback(async () => {
    const { posts, pointsMap } = await fetchPoints(feed.length);
    const feedsWithPoints = posts.map((post: any) => ({
      ...post,
      points: pointsMap[post.hash]?.points || 0, // Safe access to points
      degen: pointsMap[post.hash]?.degen || 0, // Safe access to degen
    }));
    setFeed((prev) => [...prev, ...feedsWithPoints]);
  }, []);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  return { feed, fetchAndUpdatePoints, getFeed };
};

export default useFeed;
