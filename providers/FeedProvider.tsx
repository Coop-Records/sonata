'use client';
import { FeedFilter } from '@/types/Feed';
import { Cast as CastType } from '@/types/Cast';
import { ReactNode, createContext, useContext, useState } from 'react';

type FeedProviderType = {
  copied: boolean;
  setCopied: (copied: boolean) => void;
  fundsRecipient: `0x${string}` | undefined;
  setFundsRecipient: (fundsRecipient: `0x${string}`) => void;
  saleStrategy: `0x${string}` | undefined;
  setSaleStrategy: (saleStrategy: `0x${string}`) => void;
  setupActions: string[];
  setSetupActions: (actions: string[]) => void;
  filter: FeedFilter;
  updateFilter: (change: FeedFilter) => void;
  feed: CastType[];
  setFeed: (feed: CastType[]) => void;
};

const FeedContext = createContext<FeedProviderType>({} as any);

const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [setupActions, setSetupActions] = useState<string[]>([]);
  const [filter, setFilter] = useState<FeedFilter>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [fundsRecipient, setFundsRecipient] = useState<`0x${string}`>();
  const [saleStrategy, setSaleStrategy] = useState<`0x${string}`>();
  const [feed, setFeed] = useState<CastType[]>([]);

  const updateFilter = (change: FeedFilter) => {
    setFilter((prev) => ({ ...prev, ...change }));
  };

  const value = {
    copied,
    setCopied,
    fundsRecipient,
    setFundsRecipient,
    saleStrategy,
    setSaleStrategy,
    setupActions,
    setSetupActions,
    filter,
    updateFilter,
    feed,
    setFeed,
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
