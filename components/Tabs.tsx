'use client';
import { cn } from '@/lib/utils';
import { FeedType, useFeedProvider } from '@/providers/FeedProvider';
import { useNeynarProvider } from '@/providers/NeynarProvider';

type tab = {
  label: string;
  href?: string;
  value: string;
};

export default function Tabs({ tabs, className = '' }: { tabs: tab[]; className?: string }) {
  const { feedType, setFeedType } = useFeedProvider();
  const { user } = useNeynarProvider();
  console.log('SWEETS user', user);

  return (
    <ul className={`flex gap-4 ${className}`}>
      {tabs.map((tab, index) => {
        console.log('SWEETS TAB', tab, feedType);
        const isDisabled = tab.value === FeedType.Following && !user;
        console.log('SWEETS isDisabled', isDisabled);
        if (isDisabled) return <></>;
        return (
          <li
            className={cn(
              'py-2 text-lg font-bold',
              feedType === tab.value && 'border-b-2 border-black',
            )}
            key={index}
          >
            <button onClick={() => setFeedType(tab.value)}>{tab.label} </button>
          </li>
        );
      })}
    </ul>
  );
}
