import { useToast } from '@/components/ui/use-toast';
import { useStakeProvider } from '@/providers/StakeProvider';
import { useTipProvider } from '@/providers/TipProvider';
import { ChannelStakeResponse } from '@/types/Stake';
import { usePrivy } from '@privy-io/react-auth';
import { useParams } from 'next/navigation';

function useStake() {
  const { channelId }: { channelId: string } = useParams();
  const { toast } = useToast();
  const { getAccessToken } = usePrivy();
  const { balance, setBalance } = useTipProvider();
  const { setChannelDetails, channelDetails, setUserStakedAmount, userStakedAmount } =
    useStakeProvider();

  const stake = async (amount: number) => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw Error('Invalid signer');
      }
      if (!balance || BigInt(amount) > balance) {
        throw Error('Invalid entry');
      }
      const res = await fetch('/api/channel/stake', {
        body: JSON.stringify({ channelId, amount, accessToken }),
        method: 'POST',
      });
      const stakeData: ChannelStakeResponse = await res.json();
      if ('error' in stakeData) throw Error(stakeData.error);

      const { usedAmount, remainingBalance } = stakeData;

      const staking = channelDetails.staking;
      staking.staked += usedAmount;
      if (userStakedAmount == 0) ++staking.stakers;

      setChannelDetails({ ...channelDetails, staking });
      setBalance(BigInt(remainingBalance));
      setUserStakedAmount(userStakedAmount + usedAmount);

      toast({ description: `Staked ${usedAmount} NOTES` });
    } catch (error: any) {
      toast({ description: error.message || 'Could not stake', variant: 'destructive' });
    }
  };
  return { stake };
}

export default useStake;
