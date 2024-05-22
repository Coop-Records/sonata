'use client';

import { useFeedProvider } from '@/providers/FeedProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const channels = [
  {
    label: '/sonata',
    value: 'sonata',
    icon: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4e85acaa-4f1d-444b-1e35-dd06d43d0800/rectcrop3',
  },
  // { label: '/music', value: 'music', icon: 'https://ipfs.decentralized-content.com/ipfs/bafybeibdk7mvrhmud76ye6wm623sjgtiashik2imee7dkeliiq4wfissqq' },
  { label: '/soundscapes', value: 'soundscapes', icon: 'https://i.imgur.com/TUtJ82Q.jpg' },
  { label: '/albumoftheday', value: 'albumoftheday', icon: 'https://i.imgur.com/RZQbasU.gif' },
  { label: '/djs', value: 'djs', icon: 'https://i.imgur.com/EQ7kMoE.jpg' },
  { label: '/soundxyz', value: 'soundxyz', icon: 'https://i.imgur.com/BbvrNR2.jpg' },
  // { label: '/coop-recs', value: 'coop-recs', icon: 'https://i.imgur.com/fQN9Jr6.gif' },
  { label: '/bangers', value: 'bangers', icon: 'https://i.imgur.com/URBvewb.png' },
  // { label: '/tropicalhouse', value: 'tropicalhouse', icon: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/257f7912-2983-496e-aa2e-86d34a8c2f00/original' },
];

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
        {channels.map((option) => {
          const active = currentFilter.channel === option.value;
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
