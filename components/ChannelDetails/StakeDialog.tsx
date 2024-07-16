import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import formatNumber from '@/lib/formatNumber';
import { useUi } from '@/providers/UiProvider';
import { useState } from 'react';
import Body from './StakeDialogBody';

function StakeDialog({ balance = 0, disabled = true }) {
  const { isMobile } = useUi();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='text-center'>
        <Button
          disabled={disabled}
          onClick={() => setIsOpen(true)}
          className="h-auto rounded-full px-9 py-4 text-base font-normal">
          STAKE NOTES
        </Button>
        <p className='mt-2 text-sm font-semibold'>
          <span className='text-sm font-normal text-grey'>Staked: </span>
          {formatNumber(balance)} NOTES
        </p>
      </div>

      <Dialog open={!isMobile && isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='max-w-[709px] !rounded-3xl p-8'>
          <Body balance={balance} className='gap-8' />
        </DialogContent>
      </Dialog>

      <Drawer open={isMobile && isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <Body balance={balance} className='gap-6 p-6' />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default StakeDialog;