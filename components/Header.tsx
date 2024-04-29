'use client';
import Tabs from '@/components/Tabs';
import SignInButton from './SignInButton';
import { usePathname } from 'next/navigation';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import Image from 'next/image';
import { join } from 'path';
import { formatBigInt } from '@/lib/utils';
import { isNil } from 'lodash';
import { useStackProvider } from '@/providers/StackProvider';

const tabs = [
  { label: 'Home', href: '/', active: true },
  { label: 'Trending', href: '/trending' },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useNeynarProvider();
  const { balance, remainingTipAllocation, dailyTipAllowance } = useStackProvider();

  tabs.forEach((tab) => {
    tab.active = tab.href === pathname;
  });

  return (
    <div className="container flex justify-between items-center py-4">
      <Tabs tabs={tabs} />
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex flex-col items-center justify-end text-xs h-full">
            <div className="flex items-center w-full">
              <span className="text-base">
                Daily Allowance:{' '}
                {`${!isNil(remainingTipAllocation) ? formatBigInt(BigInt(remainingTipAllocation)) : '-'} / ${dailyTipAllowance ? formatBigInt(BigInt(dailyTipAllowance)) : '-'}`}
              </span>{' '}
              <Image src="/images/notes.jpg" width={20} height={20} alt="" />
            </div>
            <div className="flex items-center w-full">
              <span className="text-base">
                Total Balance: {`${!isNil(balance) ? formatBigInt(BigInt(balance)) : '-'}`}
              </span>{' '}
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
