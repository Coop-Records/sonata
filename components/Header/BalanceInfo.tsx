'use client';
import Image from 'next/image';
import { formatBigInt } from '@/lib/utils';
import { isNil } from 'lodash';
import { useTipProvider } from '@/providers/TipProvider';
import ClaimAirdropButton from './ClaimAirdropButton';

export default function BalanceInfo() {
  const { balance, remainingTipAllocation, dailyTipAllowance, airdropBalance } = useTipProvider();

  return (
    <div className="flex flex-row gap-2 text-xs flex-wrap">
      <div className="flex items-center">
        <span className="whitespace-nowrap">{`Daily Allowance: ${!isNil(remainingTipAllocation) ? formatBigInt(BigInt(remainingTipAllocation)) : '-'} / ${dailyTipAllowance ? formatBigInt(BigInt(dailyTipAllowance)) : '-'}`}</span>{' '}
        <Image src="/images/notes.jpg" width={20} height={20} alt="" />
      </div>
      <div className="flex items-center">
        <span className="whitespace-nowrap">{`Total Balance: ${!isNil(balance) ? formatBigInt(BigInt(balance)) : '-'}`}</span>
        <Image src="/images/notes.jpg" width={20} height={20} alt="" />
      </div>
      {airdropBalance > 0 ? (
        <div className="flex items-center">
          <span className="whitespace-nowrap">{`Airdrop Balance: ${!isNil(airdropBalance) ? formatBigInt(BigInt(airdropBalance)) : '-'}`}</span>
          <Image src="/images/notes.jpg" width={20} height={20} alt="" />
        </div>
      ) : (
        <></>
      )}
      {airdropBalance > 0 ? <ClaimAirdropButton /> : <></>}
    </div>
  );
}
