import { useToast } from '@/components/ui/use-toast';
import executeChannelUnstake from '@/lib/sonata/staking/executeChannelUnstake';
import { useStakeProvider } from '@/providers/StakeProvider';
import { useTipProvider } from '@/providers/TipProvider';
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
      const res = await executeChannelUnstake({ channelId, amount, accessToken });

      const staking = channelDetails.staking;
      staking.staked -= amount;
      if (res.remainingStake == 0) --staking.stakers;

      setChannelDetails({ ...channelDetails, staking });
      setBalance(balance + BigInt(amount));
      setUserStakedAmount(res.remainingStake);

      toast({ description: `Unstaked ${res?.unstakedAmount} NOTES` });
    } catch (error: any) {
      console.error(error);
      toast({ description: error.message ?? 'Could not unstake', variant: 'destructive' });
    }
  };
  return { unstake };
}

export default useUnstake;
