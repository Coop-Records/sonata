import { useCallback, useEffect, useState } from 'react';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import { FeedType, useFeedProvider } from '@/providers/FeedProvider';

const useFeed = ({ feedType }: { feedType: string }) => {
  const [feed, setFeed] = useState<any[]>([]);
  const { supabaseClient } = useSupabaseProvider();
  const { filter } = useFeedProvider();

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
      query.range(start, start + 5);
    } else {
      query.order('likes', { ascending: false });
      query.range(start, start + 20);
    }

    const { data: posts } = await query.returns();

    return {
      posts
    };
  };

  const getFeed = useCallback(async (start: number) => {
    const { posts } = await fetchPoints(start);
    setFeed((prev) => [...prev, ...posts]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFeed(0);
  }, [getFeed]);

  return { feed, fetchAndUpdatePoints, getFeed };
};

export default useFeed;
