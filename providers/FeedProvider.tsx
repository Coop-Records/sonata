'use client';
import { FeedFilter } from '@/types/Feed';
import { Cast as CastType } from '@/types/Cast';
import { ReactNode, createContext, useContext, useState } from 'react';

type FeedProviderType = {
  filter: FeedFilter;
  updateFilter: (change: FeedFilter) => void;
  feed: CastType[];
  setFeed: (feed: CastType[]) => void;
  feedType: string;
  setFeedType: (feedType: string) => void;
};

export enum FeedType {
  Trending = 'Trending',
  Recent = 'Recent',
}

const FeedContext = createContext<FeedProviderType>({} as any);

const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FeedFilter>({});
  const [feed, setFeed] = useState<CastType[]>([]);
  const [feedType, setFeedType] = useState<string>(FeedType.Trending);

  const updateFilter = (change: FeedFilter) => {
    setFilter((prev) => ({ ...prev, ...change }));
  };

  const value = {
    filter,
    updateFilter,
    feed,
    setFeed,
    feedType,
    setFeedType,
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
