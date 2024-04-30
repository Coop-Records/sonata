'use client';
import Image from 'next/image';
import { formatBigInt } from '@/lib/utils';
import { isNil } from 'lodash';
import { useStackProvider } from '@/providers/StackProvider';

export default function BalanceInfo() {
  const { balance, remainingTipAllocation, dailyTipAllowance } = useStackProvider();

  return (
    <div className="flex h-full flex-col items-center justify-end text-xs">
      <div className="flex w-full items-center">
        <span className="text-base">
          Daily Allowance:{' '}
          {`${!isNil(remainingTipAllocation) ? formatBigInt(BigInt(remainingTipAllocation)) : '-'} / ${dailyTipAllowance ? formatBigInt(BigInt(dailyTipAllowance)) : '-'}`}
        </span>{' '}
        <Image src="/images/notes.jpg" width={20} height={20} alt="" />
      </div>
      <div className="flex w-full items-center">
        <span className="text-base">
          Total Balance: {`${!isNil(balance) ? formatBigInt(BigInt(balance)) : '-'}`}
        </span>{' '}
        <Image src="/images/notes.jpg" width={20} height={20} alt="" />
      </div>
    </div>
  );
}
