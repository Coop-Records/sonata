'use client';
import { cn } from '@/lib/utils';
import { useFeedProvider } from '@/providers/FeedProvider';

type tab = {
  label: string;
  href?: string;
  value: string;
};

export default function Tabs({ tabs }: { tabs: tab[] }) {
  const { feedType, setFeedType } = useFeedProvider();

  return (
    <ul className="flex gap-4">
      {tabs.map((tab, index) => {
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
