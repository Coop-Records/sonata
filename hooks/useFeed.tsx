import getCombinedFeeds from '@/lib/neynar/getCombinedFeeds';
import { SupabasePost } from '@/types/SupabasePost';
import { useEffect, useState } from 'react';

const useFeed = () => {
  const [feed, setFeed] = useState<SupabasePost[]>([]);
  const [sorted, setSorted] = useState<SupabasePost[]>([]);
  const [sortOrder, setSortOrder] = useState<'trending' | 'recent'>('trending');

  const sortTrending = (originalFeed = [...feed]) => {
    originalFeed.sort((cast1: SupabasePost, cast2: SupabasePost) => {
      return cast2.likes - cast1.likes;
    });
    setSorted(originalFeed.splice(0, 50));
    setSortOrder('trending');
  };

  const sortRecent = (originalFeed = [...feed]) => {
    originalFeed.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    setSorted(originalFeed.splice(0, 50));
    setSortOrder('recent');
  };

  useEffect(() => {
    const init = async () => {
      const response = await getCombinedFeeds();
      setFeed(response);
      if (sortOrder === 'recent') {
        sortRecent(response);
        return;
      }
      sortTrending(response);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { feed, sortRecent, sorted, sortTrending };
};

export default useFeed;
