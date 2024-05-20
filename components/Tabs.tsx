'use client';
import { cn } from '@/lib/utils';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { FeedType } from '@/types/Feed';

type tab = {
  label: string;
  href?: string;
  value: string;
};

export default function Tabs({ tabs, className = '' }: { tabs: tab[]; className?: string }) {
  const { feedType, setFeedType } = useFeedProvider();
  const { user } = useNeynarProvider();

  return (
    <ul className={`flex gap-4 ${className}`}>
      {tabs
        .filter((tab) => {
          const isDisabled = tab.value === FeedType.Following && !user;
          return !isDisabled;
        })
        .map((tab, index) => {
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
