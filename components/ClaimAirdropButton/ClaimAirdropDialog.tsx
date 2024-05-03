import Loading from '@/app/loading';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useTipProvider } from '@/providers/TipProvider';
import { Button } from '../ui/button';

const ClaimAirdropDialog = ({ onPost, isOpen, setIsOpen, isLoading }: any) => {
  const { airdropBalance } = useTipProvider();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[75vw]">
        <DialogHeader className="flex items-center text-center">
          <DialogTitle>Claim Your Airdrop</DialogTitle>
          <DialogDescription>You have {airdropBalance} $NOTES waiting for you</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <Button onClick={onPost} disabled={isLoading}>
            {isLoading ? <Loading /> : <span>Claim Airdrop</span>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimAirdropDialog;
