'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type tab = {
  label: string;
  href?: string;
};

export default function Tabs({ tabs }: { tabs: tab[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex gap-4">
      {tabs.map((tab, index) => {
        return (
          <li
            className={cn(
              'py-2 text-lg font-bold',
              pathname === tab.href && 'border-b-2 border-black',
            )}
            key={index}
          >
            {tab.href ? <Link href={tab.href}>{tab.label} </Link> : tab.label}
          </li>
        );
      })}
    </ul>
  );
}
