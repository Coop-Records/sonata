import { useToast } from "@/components/ui/use-toast";
import requestUnstake from "@/lib/sonata/staking/requestChannelUnstake";
import { useNeynarProvider } from "@/providers/NeynarProvider";
import { useStakeProvider } from "@/providers/StakeProvider";
import { useTipProvider } from "@/providers/TipProvider";
import { useParams } from "next/navigation";

function useUnstake() {
  const { channelId } = useParams();
  const { toast } = useToast();
  const { signer } = useNeynarProvider();
  const { balance, setBalance } = useTipProvider();
  const { setChannelDetails, channelDetails, setUserStakedAmount, userStakedAmount } = useStakeProvider();

  const unstake = async (amount: number) => {
    if (!signer?.signer_uuid) {
      toast({ description: 'Invalid signer', variant: 'destructive' });
      return;
    }
    if (amount > userStakedAmount) {
      toast({ description: 'Invalid entry', variant: 'destructive' });
      return;
    }
    const res = await requestUnstake(amount, signer.signer_uuid, channelId);

    if (!res) {
      toast({ description: 'Could not unstake', variant: 'destructive' });
      return;
    }
    const staking = channelDetails.staking;
    staking.staked -= amount;

    setChannelDetails({ ...channelDetails, staking });
    setBalance(balance + BigInt(amount));
    setUserStakedAmount(userStakedAmount - amount);

    toast({ description: res.message });
  };
  return { unstake };
};

export default useUnstake;