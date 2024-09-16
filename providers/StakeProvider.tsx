import useChannelDetails, { DEFAULT_CHANNEL_DETAILS } from '@/hooks/useChannelDetails';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { useTipProvider } from './TipProvider';

const StakeContext = createContext({
  channelImage: '',
  balance: BigInt(0),
  loading: true,
  userStakedAmount: 0,
  channelDetails: DEFAULT_CHANNEL_DETAILS,
  setChannelDetails: (() => {}) as Dispatch<SetStateAction<typeof DEFAULT_CHANNEL_DETAILS>>,
  setUserStakedAmount: (() => {}) as Dispatch<SetStateAction<number>>,
});

const StakeProvider = ({ children }: any) => {
  const { balance } = useTipProvider();
  const channelDetails = useChannelDetails();

  return (
    <StakeContext.Provider value={{ balance, ...channelDetails }}>{children}</StakeContext.Provider>
  );
};

export const useStakeProvider = () => {
  const context = useContext(StakeContext);
  if (!context) throw new Error('useStakeProvider failed');

  return context;
};

export default StakeProvider;
