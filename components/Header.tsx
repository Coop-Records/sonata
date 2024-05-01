'use client';
import Tabs from '@/components/Tabs';
import SignInButton from './SignInButton';
import { usePathname } from 'next/navigation';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import Image from 'next/image';
import { formatBigInt } from '@/lib/utils';
import { isNil } from 'lodash';
import { useTipProvider } from '@/providers/TipProvider';

const tabs = [
  { label: 'Home', href: '/', active: true },
  { label: 'Trending', href: '/trending' },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useNeynarProvider();
  const { balance, remainingTipAllocation, dailyTipAllowance } = useTipProvider();

  tabs.forEach((tab) => {
    tab.active = tab.href === pathname;
  });

  return (
    <div className="container flex justify-between items-center py-4">
      <Tabs tabs={tabs} />
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex flex-row items-center justify-end text-xs h-full flex-wrap gap-2">
            {/* <div className="flex items-center">
              <button className="rounded bg-blue-500 text-white" onClick={() => {}}>
                Claim Airdrop
              </button>
            </div> */}
            <div className="flex items-center">
              <span className="whitespace-nowrap">{`Daily Allowance: ${!isNil(remainingTipAllocation) ? formatBigInt(BigInt(remainingTipAllocation)) : '-'} / ${dailyTipAllowance ? formatBigInt(BigInt(dailyTipAllowance)) : '-'}`}</span>{' '}
              <Image src="/images/notes.jpg" width={20} height={20} alt="" />
            </div>
            <div className="flex items-center">
              <span className="whitespace-nowrap">{`Total Balance: ${!isNil(balance) ? formatBigInt(BigInt(balance)) : '-'}`}</span>
              <Image src="/images/notes.jpg" width={20} height={20} alt="" />
            </div>
          </div>
        ) : (
          <></>
        )}
        <SignInButton />
      </div>
    </div>
  );
}
