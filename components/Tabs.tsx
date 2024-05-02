'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

type tab = {
  label: string;
  href?: string;
};

export default function Tabs({ tabs }: { tabs: tab[] }) {
  const pathname = usePathname();
  const { push } = useRouter();

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
            {tab.href ? (
              <button onClick={() => push(tab.href as any)} type="button">
                {tab.label}{' '}
              </button>
            ) : (
              tab.label
            )}
          </li>
        );
      })}
    </ul>
  );
}
