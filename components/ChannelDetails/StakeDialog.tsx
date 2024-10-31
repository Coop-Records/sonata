import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import formatNumber from '@/lib/formatNumber';
import { useUi } from '@/providers/UiProvider';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import Body from './StakeDialogBody';

function StakeDialog({ balance = 0 }) {
  const { isMobile, checkLoggedIn } = useUi();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onStart = () => {
    setIsOpen(false);
    setIsProcessing(true);
  };
  const onCompleted = () => setIsProcessing(false);
  const openDialog = () => {
    if (checkLoggedIn()) setIsOpen(true);
  };

  return (
    <>
      <div className="text-center">
        <Button
          disabled={isProcessing}
          onClick={openDialog}
          className="h-auto rounded-full bg-blue px-9 py-3 text-foreground max-md:w-full"
        >
          {isProcessing ? <Loader2 className="animate-spin" /> : 'Stake NOTES'}
        </Button>
        <p className="mt-2 text-sm">
          <span className="font-thin">Staked: </span>
          <span className="font-semibold">{formatNumber(balance)} NOTES</span>
        </p>
      </div>

      <Dialog open={!isMobile && isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[709px] !rounded-3xl p-8">
          <Body
            stakedBalance={balance}
            onStart={onStart}
            onCompleted={onCompleted}
            className="gap-8"
          />
        </DialogContent>
      </Dialog>

      <Drawer open={isMobile && isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <Body
            stakedBalance={balance}
            onStart={onStart}
            onCompleted={onCompleted}
            className="gap-6 p-6"
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default StakeDialog;
