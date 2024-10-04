import { useToast } from '@/components/ui/use-toast';
import claimAirdrop from '@/lib/sonata/claimAirdrop';
import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';

const useClaimAirdropModal = () => {
  const { getAccessToken } = usePrivy();
  const [isPostDialogOpen, setIsPostDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePost = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      const { airdropAmount } = await claimAirdrop(accessToken);
      toast({ description: `Airdropped ${airdropAmount} NOTES` });
    } catch (error) {
      toast({ description: `${error}` });
    }
    setIsPostDialogOpen(false);
    setIsLoading(false);
  };

  const handleClick = () => {
    setIsPostDialogOpen(true);
  };

  return { handleClick, handlePost, isPostDialogOpen, setIsPostDialogOpen, isLoading };
};

export default useClaimAirdropModal;
