'use client';
import { cn } from '@/lib/utils';
import { useFeedProvider } from '@/providers/FeedProvider';

type tab = {
  label: string;
  href?: string;
  value: string;
};

export default function Tabs({ tabs, className = '' }: { tabs: tab[]; className?: string }) {
  const { feedType, setFeedType } = useFeedProvider();

  return (
    <section className="border-b border-tab w-full flex justify-center">
      <ul className={`flex gap-12 ${className}`}>
        {tabs.map((tab, index) => {
          return (
            <li
              className={cn(
                'pb-4 text-lg font-sora_semibold',
                feedType === tab.value && 'border-b-2 border-black',
              )}
              key={index}
            >
              <button onClick={() => setFeedType(tab.value)}>{tab.label} </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
