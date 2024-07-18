import { TrackMetadata } from '@/types/Track';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useTipProvider } from './TipProvider';

const DEFAULT_CHANNEL_DETAILS = {
  info: undefined as any,
  balance: 0,
  topSong: undefined as TrackMetadata | undefined,
  staking: {
    stakers: 0,
    staked: 0,
  },
};
const StakeContext = createContext({
  balance: BigInt(0),
  userStakedAmount: 0,
  channelDetails: DEFAULT_CHANNEL_DETAILS,
  setChannelDetails: (() => { }) as Dispatch<SetStateAction<typeof DEFAULT_CHANNEL_DETAILS>>,
  setUserStakedAmount: (() => { }) as Dispatch<SetStateAction<number>>
});

const StakeProvider = ({ children }: any) => {
  const { balance } = useTipProvider();
  const [userStakedAmount, setUserStakedAmount] = useState(0);

  const [channelDetails, setChannelDetails] = useState(DEFAULT_CHANNEL_DETAILS);

  return (
    <StakeContext.Provider
      value={{
        balance,
        channelDetails,
        userStakedAmount,
        setChannelDetails,
        setUserStakedAmount,
      }}
    >
      {children}
    </StakeContext.Provider>
  );
};

export const useStakeProvider = () => {
  const context = useContext(StakeContext);
  if (!context) throw new Error('useStakeProvider failed');

  return context;
};

export default StakeProvider;