'use client';

import { useFeedProvider } from '@/providers/FeedProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CHANNELS } from '@/lib/consts';

export default function ChannelFilter() {
  const { filter: currentFilter, updateFilter } = useFeedProvider();

  const handleClick = (value: string) => {
    const isActiveFilter = value === currentFilter.channel;
    updateFilter({ channel: isActiveFilter ? '' : value });
  };

  return (
    <div className="flex flex-col sm:gap-2">
      <h2 className="font-semibold sm:mb-2">Channels</h2>
      <div>
        {CHANNELS.map((option) => {
          const active = currentFilter?.channel === option.value;
          return (
            <Button
              onClick={() => handleClick(option.value)}
              key={option.value}
              variant="ghost"
              className={cn(
                'flex px-3 py-2 justify-start items-center space-x-2 w-full font-semibold',
                active && 'bg-muted',
              )}
            >
              <div className="relative size-6 overflow-hidden rounded-full">
                <Image
                  src={option.icon}
                  fill
                  alt=""
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>

              <span>{option.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
