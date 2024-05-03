import { useToast } from '@/components/ui/use-toast';
import claimAirdrop from '@/lib/sonata/claimAirdrop';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useState } from 'react';

const useClaimAirdropModal = () => {
  const { signer, user } = useNeynarProvider();
  const [isPostDialogOpen, setIsPostDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePost = async () => {
    setIsLoading(true);
    if (user?.verifications.length === 0) {
      toast({ description: 'Please verify an address on warpcast and try again' });
    } else if (user?.verifications) {
      const response = await claimAirdrop(signer?.signer_uuid, user?.verifications[0]);
      toast({ description: `${response.message}` });
      setIsPostDialogOpen(false);
    }
    setIsLoading(false);
  };

  const handleClick = () => {
    setIsPostDialogOpen(true);
  };

  return { handleClick, handlePost, isPostDialogOpen, setIsPostDialogOpen, isLoading };
};

export default useClaimAirdropModal;
