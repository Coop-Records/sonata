import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type tab = {
  label: string;
  active?: boolean;
  href?: string;
};

export default function Tabs({ tabs }: { tabs: tab[] }) {
  return (
    <ul className="flex gap-4">
      {tabs.map((tab, index) => {
        return (
          <li
            className={twMerge('py-2 text-lg font-bold', tab.active && 'border-b-2 border-black')}
            key={index}
          >
            {tab.href ? <Link href={tab.href}>{tab.label} </Link> : tab.label}
          </li>
        );
      })}
    </ul>
  );
}
