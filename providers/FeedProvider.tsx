import useFeed from '@/hooks/useFeed';
import useSigner from '@/hooks/useSigner';
import { createContext, useContext, useMemo, useState } from 'react';

const FeedContext = createContext<any>(null);

const FeedProvider = ({ children }: any) => {
  const [setupActions, setSetupActions] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [fundsRecipient, setFundsRecipient] = useState<`0x${string}`>();
  const [saleStrategy, setSaleStrategy] = useState<`0x${string}`>();
  const feed = useFeed();

  const value = useMemo(
    () => ({
      copied,
      setCopied,
      ...feed,
      fundsRecipient,
      setFundsRecipient,
      saleStrategy,
      setSaleStrategy,
      setupActions,
      setSetupActions,
    }),
    [
      copied,
      setCopied,
      feed,
      fundsRecipient,
      setFundsRecipient,
      saleStrategy,
      setSaleStrategy,
      setupActions,
      setSetupActions,
    ],
  );

  return <FeedContext.Provider value={value as any}>{children}</FeedContext.Provider>;
};

export const useFeedProvider = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeedProvider must be used within a FeedProvider');
  }
  return context;
};

export default FeedProvider;
