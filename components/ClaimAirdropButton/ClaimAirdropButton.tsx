'use client';

import { Button } from '../ui/button';
import ClaimAirdropDialog from './ClaimAirdropDialog';
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
      <Button
        type="button"
        className="flex items-center space-x-2 rounded-full p-6"
        onClick={handleClick}
      >
        <img width={24} height={24} className="fill-white" src="images/notes.png" />
        <span className="line-height-[16.8px] text-[14px]">Claim Airdrop</span>
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
