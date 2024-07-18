import { useToast } from '@/components/ui/use-toast';
import { executeStake, executeUnstake } from '@/lib/sonata/staking';
import { TrackMetadata } from '@/types/Track';
import { useParams } from 'next/navigation';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useNeynarProvider } from './NeynarProvider';
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
  channelStake: async (amount: number) => { amount },
  channelUnStake: async (amount: number) => { amount },
  setChannelDetails: (() => { }) as Dispatch<SetStateAction<typeof DEFAULT_CHANNEL_DETAILS>>,
  setUserStakedAmount: (() => { }) as Dispatch<SetStateAction<number>>
});

const StakeProvider = ({ children }: any) => {
  const { toast } = useToast();
  const { channelId } = useParams();
  const { signer } = useNeynarProvider();
  const { balance, setBalance } = useTipProvider();
  const [userStakedAmount, setUserStakedAmount] = useState(0);

  const [channelDetails, setChannelDetails] = useState(DEFAULT_CHANNEL_DETAILS);

  const channelStake = async (amount: number) => {
    if (!signer?.signer_uuid) {
      toast({ description: 'Invalid signer', variant: 'destructive' });
      return;
    }
    if (!balance || BigInt(amount) > balance) {
      toast({ description: 'Invalid entry', variant: 'destructive' });
      return;
    }
    const res = await executeStake(amount, signer.signer_uuid, channelId);

    if (!res) {
      toast({ description: 'Could not stake', variant: 'destructive' });
      return;
    }
    const staking = channelDetails.staking;
    staking.staked += res.usedAmount;

    setChannelDetails({ ...channelDetails, staking });
    setBalance(BigInt(res.remainingBalance));
    setUserStakedAmount(userStakedAmount + res.usedAmount);

    toast({ description: res.message });
  };

  const channelUnStake = async (amount: number) => {
    if (!signer?.signer_uuid) {
      toast({ description: 'Invalid signer', variant: 'destructive' });
      return;
    }
    if (amount > userStakedAmount) {
      toast({ description: 'Invalid entry', variant: 'destructive' });
      return;
    }
    const res = await executeUnstake(amount, signer.signer_uuid, channelId);

    if (!res) {
      toast({ description: 'Could not unstake', variant: 'destructive' });
      return;
    }
    const staking = channelDetails.staking;
    staking.staked -= amount;

    setChannelDetails({ ...channelDetails, staking });
    setBalance(balance ?? BigInt(0) + BigInt(amount));
    setUserStakedAmount(userStakedAmount - amount);

    toast({ description: res.message });
  };

  return (
    <StakeContext.Provider
      value={{
        balance,
        channelDetails,
        userStakedAmount,
        channelStake,
        channelUnStake,
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