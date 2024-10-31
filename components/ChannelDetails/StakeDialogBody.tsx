import useChannelStake from '@/hooks/useChannelStake';
import { cn, formatBigInt } from '@/lib/utils';
import { useTipProvider } from '@/providers/TipProvider';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StakeTabs from './StakeTabs';
import formatNumber from '@/lib/formatNumber';
import NotesIcon from '@/components/NotesIcon';

const tabs = [
  { label: 'Stake', value: true },
  { label: 'Unstake', value: false },
];

function Body({ className = '', stakedBalance = 0, onStart = () => {}, onCompleted = () => {} }) {
  const [isStake, setIsStake] = useState(true);
  const [amount, setAmount] = useState<number>();
  const { stake, unstake } = useChannelStake();
  const { balance } = useTipProvider();

  const processStaking = async () => {
    const safeAmount = Number(amount ?? 0);
    onStart();
    await (isStake ? stake(safeAmount) : unstake(safeAmount));
    onCompleted();
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <h2 className="text-center font-clashDisplay text-lg/5 font-medium">Stake</h2>
      <StakeTabs tabs={tabs} onSelect={setIsStake} className="mx-auto w-fit" />
      <div>
        <label className="flex cursor-text items-center rounded-full bg-secondary px-6 py-4">
          <Input
            type="number"
            min={0}
            value={String(amount ?? '')}
            placeholder="0.0"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="h-auto grow border-none bg-transparent p-0 text-base/5 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-sm/5">NOTES</span>
            <NotesIcon size={16} />
          </div>
        </label>
        <div className="mt-4 flex items-center justify-end gap-2">
          <h5 className="text-xs/4">
            Balance: {isStake ? formatBigInt(balance) : formatNumber(stakedBalance)} NOTES
          </h5>
        </div>
      </div>
      <Button
        disabled={!amount}
        onClick={processStaking}
        className="h-auto w-full rounded-full p-4 text-sm/5 font-normal"
      >
        {isStake ? 'Stake' : 'Unstake'}
      </Button>
    </div>
  );
}

export default Body;
