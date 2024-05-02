'use client';

import { FeedFilter } from '@/types/Feed';
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import useNewCasts from '@/hooks/useNewCasts';
import useFeed from '@/hooks/useFeed';

const FeedContext = createContext<any>({} as any);

const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FeedFilter>({});
  const { newCasts } = useNewCasts();
  const feed = useFeed();

  const updateFilter = useCallback((change: FeedFilter) => {
    setFilter((prev) => ({ ...prev, ...change }));
  }, []);

  const value = useMemo(
    () =>
      ({
        filter,
        updateFilter,
        newCasts,
        ...feed,
      }) as any,
    [filter, updateFilter, newCasts, feed],
  );

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
