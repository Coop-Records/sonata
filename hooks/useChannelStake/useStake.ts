import { useToast } from "@/components/ui/use-toast";
import { executeStake } from "@/lib/sonata/staking";
import { useNeynarProvider } from "@/providers/NeynarProvider";
import { useStakeProvider } from "@/providers/StakeProvider";
import { useTipProvider } from "@/providers/TipProvider";
import { useParams } from "next/navigation";

const useStake = () => {
  const { channelId } = useParams();
  const { toast } = useToast();
  const { signer } = useNeynarProvider();
  const { balance, setBalance } = useTipProvider();
  const { setChannelDetails, channelDetails, setUserStakedAmount, userStakedAmount } = useStakeProvider();

  return async (amount: number) => {
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
  }
};

export default useStake;