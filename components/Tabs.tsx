'use client';
import { cn } from '@/lib/utils';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { FeedType } from '@/types/Feed';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';

type tab = {
  label: string;
  href?: string;
  value: string;
};

export default function Tabs({ tabs, className = '' }: { tabs: tab[]; className?: string }) {
  const { feedType, setFeedType } = useFeedProvider();
  const { user } = useNeynarProvider();
  const { username } = useParams();

  return (
    <ul className={cn('flex gap-4 md:gap-8', className)}>
      {tabs
        .filter((tab) => {
          if (username) {
            return tab.value === FeedType.Posts;
          }
          const isDisabled =
            (tab.value === FeedType.Following && !user) || tab.value === FeedType.Posts;
          return !isDisabled;
        })
        .map((tab, index) => {
          return (
            <li className={cn(feedType === tab.value && 'border-b-2 border-black')} key={index}>
              <Button
                variant="ghost"
                className="p-0 text-sm font-bold hover:bg-transparent md:text-lg"
                onClick={() => setFeedType(tab.value)}
              >
                {tab.label}
              </Button>
            </li>
          );
        })}
    </ul>
  );
}
