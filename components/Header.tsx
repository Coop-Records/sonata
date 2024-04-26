'use client';
import Tabs from '@/components/Tabs';
import SignInButton from './SignInButton';
import { usePathname } from 'next/navigation';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import Image from 'next/image';

const tabs = [
  { label: 'Home', href: '/', active: true },
  { label: 'Trending', href: '/trending' },
];

export default function Header() {
  const pathname = usePathname();
  const { signIn, signOut, user } = useNeynarProvider();

  tabs.forEach((tab) => {
    tab.active = tab.href === pathname;
  });

  return (
    <div className="container flex justify-between items-center py-4">
      <Tabs tabs={tabs} />
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center justify-center text-xs h-full">
          <div className="flex items-center">
            <span className="text-base">Daily Allowance: 0/1000</span>{' '}
            <Image src="/images/notes.jpg" width={20} height={20} alt="" />
          </div>
          <div className="flex items-center">
            <span className="text-base">Total Balance: 2,281,500</span>{' '}
            <Image src="/images/notes.jpg" width={20} height={20} alt="" />
          </div>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
