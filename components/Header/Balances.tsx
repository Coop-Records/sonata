import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { useTipProvider } from '@/providers/TipProvider';
import { isNil } from 'lodash';
import { formatBigInt } from '@/lib/utils';

const Balances = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { balance, remainingTipAllocation, dailyTipAllowance, airdropBalance } = useTipProvider();

  return (
    <Popover open={showDropdown} onOpenChange={setShowDropdown}>
      <PopoverTrigger asChild className={''}>
        <button
          type="button"
          className="flex items-center gap-1 text-white text-xs"
          onClick={() => setShowDropdown(true)}
        >
          <Image src={'/images/logo.png'} width={36} height={36} alt="not found image" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex w-[250px] flex-col gap-2 bg-border text-white mr-3 mt-2">
        <div className="flex flex-wrap gap-[3px]">
          <span className="font-clashdisplay">Allowance:</span>
          <span className="flex whitespace-nowrap font-clashdisplay_semibold">
            {`${!isNil(remainingTipAllocation) ? formatBigInt(BigInt(remainingTipAllocation)) : '-'}${dailyTipAllowance ? ` / ${formatBigInt(BigInt(dailyTipAllowance))}` : ''}`}
            <Image src="/images/notes.png" className="size-5" width={20} height={20} alt="" />
          </span>
        </div>
        <div className="flex flex-wrap gap-[3px]">
          <span className="font-clashdisplay">Balance:</span>
          <span className="flex whitespace-nowrap font-clashdisplay_semibold">
            1M
            <Image src="/images/notes.png" className="size-5" width={20} height={20} alt="" />
          </span>
        </div>
        <div className="flex flex-wrap gap-[3px]">
          <span className="font-clashdisplay">Staked:</span>
          <span className="flex whitespace-nowrap font-clashdisplay_semibold">
            5M
            <Image src="/images/notes.png" className="size-5" width={20} height={20} alt="" />
          </span>
        </div>
        <div className="flex flex-wrap gap-[3px]">
          <span className="font-clashdisplay">Total:</span>
          <span className="flex whitespace-nowrap font-clashdisplay_semibold">
            {`${!isNil(balance) ? formatBigInt(BigInt(balance)) : '-'}`}
            <Image src="/images/notes.png" className="size-5" width={20} height={20} alt="" />
          </span>
        </div>
        {airdropBalance > 0 ? (
          <div className="flex flex-wrap gap-[3px]">
            <span>Airdrop:</span>
            <span className="flex whitespace-nowrap">
              {`${!isNil(airdropBalance) ? formatBigInt(BigInt(airdropBalance)) : '-'}`}
              <Image src="/images/notes.png" className="size-5" width={20} height={20} alt="" />
            </span>
          </div>
        ) : (
          <></>
        )}
        <a
          className="flex items-center gap-2"
          href="https://www.stack.so/leaderboard/sonata"
          target="_blank"
        >
          <span className="font-clashdisplay_semibold">Leaderboard</span>
        </a>
      </PopoverContent>
    </Popover>
  );
};

export default Balances;
