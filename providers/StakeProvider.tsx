import useChannelDetails, { DEFAULT_CHANNEL_DETAILS } from '@/hooks/useChannelDetails';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useTipProvider } from './TipProvider';
import { UserStake } from '@/types/Stake';
import getAllUserStakes from '@/lib/sonata/staking/getAllUserStakes';
import { usePrivy } from '@privy-io/react-auth';

const StakeContext = createContext({
  channelImage: '',
  balance: BigInt(0),
  loading: true,
  userStakedAmount: 0,
  channelDetails: DEFAULT_CHANNEL_DETAILS,
  setChannelDetails: (() => {}) as Dispatch<SetStateAction<typeof DEFAULT_CHANNEL_DETAILS>>,
  setUserStakedAmount: (() => {}) as Dispatch<SetStateAction<number>>,
  stakes: [] as UserStake[],
  stakedAmount: 0,
});

const StakeProvider = ({ children }: any) => {
  const { user } = usePrivy();
  const { balance } = useTipProvider();
  const channelDetails = useChannelDetails();

  const fid = user?.farcaster?.fid;
  const [stakes, setStakes] = useState<UserStake[]>([]);
  const [stakedAmount, setStakedAmount] = useState(0);

  useEffect(() => {
    if (!fid) return;
    const fetchUserStakes = async () => {
      const stakes = await getAllUserStakes(fid);
      const stakedAmount = stakes.reduce((acc, stake) => acc + stake.points, 0);

      setStakes(stakes);
      setStakedAmount(stakedAmount);
    };
    fetchUserStakes();
  }, [fid]);

  return (
    <StakeContext.Provider value={{ balance, stakes, stakedAmount, ...channelDetails }}>
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
