'use client';
import { FeedFilter } from '@/types/Feed';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { SupabasePost } from '@/types/SupabasePost';
import { usePathname } from 'next/navigation';
import getFeed from '@/lib/supabase/getFeed';

type FeedProviderType = {
  filter: FeedFilter;
  updateFilter: (change: FeedFilter) => void;
  feed: SupabasePost[];
  setFeed: (feed: SupabasePost[]) => void;
  loading: boolean;
  fetchMore: () => void;
};

const FeedContext = createContext<FeedProviderType>({} as any);

const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FeedFilter>({});
  const [feed, setFeed] = useState<SupabasePost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const updateFilter = (change: FeedFilter) => {
    setFilter((prev) => ({ ...prev, ...change }));
  };

  useEffect(() => {
    const updateFeed = async () => {
      setLoading(true);
      const newFeed = await getFeed({ start: 0, recent: pathname.includes('/recent'), filter });

      setFeed(newFeed);
      setLoading(false);
    };
    updateFeed();
  }, [pathname, filter]);

  const fetchMore = async () => {
    const newFeed = await getFeed({
      start: feed.length,
      recent: pathname.includes('/recent'),
      filter,
    });
    setFeed((prev) => [...prev, ...newFeed]);
  };

  const value = {
    filter,
    updateFilter,
    feed,
    setFeed,
    loading,
    fetchMore,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

export const useFeedProvider = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeedProvider must be used within a FeedProvider');
  }
  return context;
};

export default FeedProvider;
