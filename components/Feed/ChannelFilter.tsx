'use client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useMemo } from 'react';

const channels = [
  { label: '/sonata', value: 'sonata' },
  { label: '/music', value: 'music' },
  { label: '/djs', value: 'djs' },
  { label: '/soundxyz', value: 'soundxyz' },
  { label: '/coop-recs', value: 'coop-recs' },
  { label: '/bangers', value: 'bangers' },
  { label: '/tropicalhouse', value: 'tropicalhouse' },
  { label: '/soundscapes', value: 'soundscapes' },
  { label: '/albumoftheday', value: 'albumoftheday' },
  { label: '/ziggyziggy', value: 'ziggyziggy' },
  { label: '/onchain-music', value: 'onchain-music' },
];

export default function ChannelFilter() {
  const { filter: currentFilter, updateFilter, feed } = useFeedProvider();
  const activeChannels = useMemo(() => {
    const channelIds = new Set(feed.map((item) => item.channelId));
    return channels.filter((channel) => channelIds.has(channel.value));
  }, [feed]);

  console.log('SWEETS FEED', feed);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-2 text-lg font-semibold">Channels</h2>
      <RadioGroup
        value={currentFilter.channel}
        onValueChange={(value) => updateFilter({ channel: value })}
      >
        {activeChannels.map((option) => {
          return (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
