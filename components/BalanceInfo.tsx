'use client';
import Image from 'next/image';
import { formatBigInt } from '@/lib/utils';
import { isNil } from 'lodash';
import { useTipProvider } from '@/providers/TipProvider';
import ClaimAirdropButton from '@/components/ClaimAirdropButton/ClaimAirdropButton';

export default function BalanceInfo() {
  const { balance, remainingTipAllocation, dailyTipAllowance, airdropBalance } = useTipProvider();

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <h2 className="font-semibold">NOTES</h2>

      <div className="flex flex-wrap gap-[3px]">
        <span>Daily Allowance:</span>
        <span className="flex whitespace-nowrap">
          {`${!isNil(remainingTipAllocation) ? formatBigInt(BigInt(remainingTipAllocation)) : '-'}${dailyTipAllowance ? ` / ${formatBigInt(BigInt(dailyTipAllowance))}` : ''}`}
          <Image src="/images/notes.png" className="size-5" width={20} height={20} alt="" />
        </span>
      </div>
      <div className="flex flex-wrap gap-[3px]">
        <span>Total Balance:</span>
        <span className="flex whitespace-nowrap">
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
      {airdropBalance > 0 ? <ClaimAirdropButton /> : <></>}
    </div>
  );
}
