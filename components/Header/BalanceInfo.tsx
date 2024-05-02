'use client';
import Image from 'next/image';
import { formatBigInt } from '@/lib/utils';
import { isNil } from 'lodash';
import { useTipProvider } from '@/providers/TipProvider';

export default function BalanceInfo() {
  const { balance, remainingTipAllocation, dailyTipAllowance } = useTipProvider();

  return (
    <div className="flex flex-col gap-2 text-xs">
      <div className="flex items-center">
        <span className="whitespace-nowrap">{`Daily Allowance: ${!isNil(remainingTipAllocation) ? formatBigInt(BigInt(remainingTipAllocation)) : '-'} / ${dailyTipAllowance ? formatBigInt(BigInt(dailyTipAllowance)) : '-'}`}</span>{' '}
        <Image src="/images/notes.jpg" width={20} height={20} alt="" />
      </div>
      <div className="flex items-center">
        <span className="whitespace-nowrap">{`Total Balance: ${!isNil(balance) ? formatBigInt(BigInt(balance)) : '-'}`}</span>
        <Image src="/images/notes.jpg" width={20} height={20} alt="" />
      </div>
    </div>
  );
}
