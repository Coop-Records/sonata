import { useToast } from '@/components/ui/use-toast';
import { useStakeProvider } from '@/providers/StakeProvider';
import { useTipProvider } from '@/providers/TipProvider';
import { ChannelUnstakeResponse } from '@/types/Stake';
import { usePrivy } from '@privy-io/react-auth';
import { useParams } from 'next/navigation';

function useUnstake() {
  const { channelId }: { channelId: string } = useParams();
  const { toast } = useToast();
  const { getAccessToken } = usePrivy();
  const { balance, setBalance } = useTipProvider();
  const { setChannelDetails, channelDetails, setUserStakedAmount, userStakedAmount } =
    useStakeProvider();

  const unstake = async (amount: number) => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw Error('Invalid signer');
      }

      if (amount > userStakedAmount) {
        throw Error('Invalid entry');
      }
      const res = await fetch('/api/channel/unstake', {
        body: JSON.stringify({ channelId, amount, accessToken }),
        method: 'POST',
      });
      const stakeData: ChannelUnstakeResponse = await res.json();
      if ('error' in stakeData) throw Error(stakeData.error);

      const { unstakedAmount, remainingStake } = stakeData;

      const staking = channelDetails.staking;
      staking.staked -= amount;
      if (remainingStake == 0) --staking.stakers;

      setChannelDetails({ ...channelDetails, staking });
      setBalance(balance + BigInt(amount));
      setUserStakedAmount(remainingStake);

      toast({ description: `Unstaked ${unstakedAmount} NOTES` });
    } catch (error: any) {
      console.error(error);
      toast({ description: error.message ?? 'Could not unstake', variant: 'destructive' });
    }
  };
  return { unstake };
}

export default useUnstake;
