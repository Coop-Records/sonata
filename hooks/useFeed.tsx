import { useEffect, useState } from 'react';
import getFeed from '@/lib/neynar/getFeed';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import _ from 'lodash';

const useFeed = () => {
  const [feed, setFeed] = useState<any[]>([]);
  const { supabaseClient } = useSupabaseProvider();

  const fetchAndUpdatePoints = async (postHash: string) => {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('points')
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
            return { ...post, points: data.points };
          }
          return post;
        }),
      );
    }
  };

  const fetchPoints = async (postHashes: string[]) => {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('post_hash, points')
      .in('post_hash', postHashes);

    if (error) {
      console.error('Error fetching points:', error);
      return {};
    }
    return data.reduce(
      (acc: { [x: string]: any }, item: { post_hash: string | number; points: any }) => {
        acc[item.post_hash] = item.points;
        return acc;
      },
      {},
    );
  };

  useEffect(() => {
    const init = async () => {
      const [response, soundCloud, soundxyz] = await Promise.all([
        getFeed('spotify.com/track'),
        getFeed('soundcloud.com'),
        getFeed('sound.xyz'),
      ]);

      const combinedFeeds = [...response.casts, ...soundCloud.casts, ...soundxyz.casts];
      const sortedFeeds = combinedFeeds.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      const postHashes = sortedFeeds.map((post) => post.hash);
      const pointsMap = await fetchPoints(postHashes);

      const feedsWithPoints = sortedFeeds.map((post) => ({
        ...post,
        points: pointsMap[post.hash] || 0,
      }));

      setFeed(feedsWithPoints);
    };
    init();
  }, []);

  return { feed, fetchAndUpdatePoints };
};

export default useFeed;
