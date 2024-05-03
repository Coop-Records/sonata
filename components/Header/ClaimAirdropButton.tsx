'use client';

import { Button } from '../ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import ClaimAirdropDialog from '../ClaimAirdropButton/ClaimAirdropDialog';
import useClaimAirdropModal from '@/hooks/useClaimAirdropModal';
import { useTipProvider } from '@/providers/TipProvider';
import { useState } from 'react';

export default function ClaimAirdropButton() {
  const { isPostDialogOpen, setIsPostDialogOpen } = useClaimAirdropModal();
  const { handlePost } = useTipProvider();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsPostDialogOpen(true);
  };

  return (
    <div>
      <Button type="button" className="space-x-2" onClick={handleClick}>
        <span>Claim Airdrop</span>
      </Button>
      <ClaimAirdropDialog
        onPost={async () => {
          setIsLoading(true);
          await handlePost();
          setIsLoading(false);
        }}
        isOpen={isPostDialogOpen}
        setIsOpen={setIsPostDialogOpen}
        isLoading={isLoading}
      />
    </div>
  );
}
