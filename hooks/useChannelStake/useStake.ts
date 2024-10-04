import { useToast } from '@/components/ui/use-toast';
import executeChannelStake from '@/lib/sonata/staking/executeChannelStake';
import { useStakeProvider } from '@/providers/StakeProvider';
import { useTipProvider } from '@/providers/TipProvider';
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
      const res = await executeChannelStake({ channelId, amount, accessToken });

      const staking = channelDetails.staking;
      staking.staked += res.usedAmount;
      if (userStakedAmount == 0) ++staking.stakers;

      setChannelDetails({ ...channelDetails, staking });
      setBalance(BigInt(res.remainingBalance));
      setUserStakedAmount(userStakedAmount + res.usedAmount);

      toast({ description: `Staked ${res.usedAmount} NOTES` });
    } catch (error: any) {
      toast({ description: error.message || 'Could not stake', variant: 'destructive' });
    }
  };
  return { stake };
}

export default useStake;
