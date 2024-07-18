import useChannelStake from "@/hooks/useChannelStake";
import formatNumber from "@/lib/formatNumber";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import StakeTabs from "./StakeTabs";

const tabs = [{ label: 'Stake', value: true }, { label: 'Unstake', value: false }];

function Body({ balance = 0, className = '', onStart = () => { }, onCompleted = () => { } }) {
  const [isStake, setIsStake] = useState(true);
  const [amount, setAmount] = useState<number>();
  const { stake, unstake } = useChannelStake();

  const processStaking = async () => {
    onStart();
    await (isStake ? stake(amount ?? 0) : unstake(amount ?? 0));
    onCompleted();
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <h2 className="text-center text-lg/5 font-semibold md:text-left">Stake NOTES</h2>
      <StakeTabs tabs={tabs} onSelect={setIsStake} className='mx-auto w-fit' />
      <div>
        <label className="flex cursor-text items-center rounded-xl bg-grey-light px-8 py-5">
          <Input
            type="number"
            min={0}
            max={balance}
            value={String(amount ?? '')}
            placeholder="0.0"
            onChange={(e) => setAmount(Number(e.target.value))}
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
        onClick={processStaking}
        className="mx-auto h-auto w-[11.25rem] rounded-full p-4 text-base/5 font-normal">
        {isStake ? 'Stake' : 'Unstake'}
      </Button>
    </div>
  )
}

export default Body;