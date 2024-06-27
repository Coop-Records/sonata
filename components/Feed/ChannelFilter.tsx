'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useUi } from '@/providers/UiProvider';

export default function ChannelFilter() {
  const { filter: currentFilter, updateFilter } = useFeedProvider();
  const { menuItems } = useUi();

  const handleClick = (value: string) => {
    const isActiveFilter = value === currentFilter.channel;
    updateFilter({ channel: isActiveFilter ? '' : value });
  };

  return (
    <div className="flex flex-col sm:gap-2">
      <h2 className="font-semibold sm:mb-2">Channels</h2>
      <div>
        {menuItems.map((option) => {
          const active = currentFilter?.channel === option.value;
          return (
            <Link
              href={active ? '/' : `/channel${option.label}`}
              onClick={() => handleClick(option.value)}
              key={option.value}
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
            </Link>
          );
        })}
      </div>
    </div>
  );
}
