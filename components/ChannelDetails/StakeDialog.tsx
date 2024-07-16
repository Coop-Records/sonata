import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import formatNumber from '@/lib/formatNumber';
import { cn } from '@/lib/utils';
import { useTipProvider } from '@/providers/TipProvider';
import { useUi } from '@/providers/UiProvider';
import Image from 'next/image';
import { useState } from 'react';
import Tabs from './StakeTabs';

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

const tabs = [{ label: 'Stake', value: true }, { label: 'Unstake', value: false }];

function Body({ balance = 0, className = '' }) {
  const [isStake, setIsStake] = useState(true);
  const [amount, setAmount] = useState<bigint | undefined>();
  const { channelStake, channelUnStake } = useTipProvider();

  return (
    <div className={cn('flex flex-col', className)}>
      <h2 className="text-center text-lg/5 font-semibold md:text-left">Stake NOTES</h2>
      <Tabs tabs={tabs} onSelect={setIsStake} className='mx-auto w-fit' />
      <div>
        <label className="flex cursor-text items-center rounded-xl bg-grey-light px-8 py-5">
          <Input
            type="number"
            min={0}
            max={balance}
            value={String(amount ?? '')}
            placeholder="0.0"
            onChange={(e) => setAmount(BigInt(e.target.value))}
            className="h-auto grow border-none bg-transparent p-0 text-base/5 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className='flex gap-1'>
            <span className='text-base/5 font-semibold'>NOTES</span>
            <Image src='/images/notes.png' width={16} height={16} className='size-4' alt="notes" />
          </div>
        </label>

        <h5 className='mt-4 text-right text-sm/4 font-semibold'>Balance: {formatNumber(balance)} NOTES</h5>
      </div>

      <Button
        disabled={!amount}
        onClick={() => isStake ? channelStake(amount) : channelUnStake(amount)}
        className="mx-auto h-auto w-[11.25rem] rounded-full p-4 text-base/5 font-normal">
        {isStake ? 'Stake' : 'Unstake'}
      </Button>
    </div>
  )
}

export default StakeDialog;