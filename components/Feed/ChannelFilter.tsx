'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useFeedProvider } from '@/providers/FeedProvider';

const channels = [
  { label: '/sonata', value: 'sonata' },
  // { label: '/music', value: 'music' },
  { label: '/soundscapes', value: 'soundscapes' },
  { label: '/albumoftheday', value: 'albumoftheday' },
  { label: '/djs', value: 'djs' },
  { label: '/soundxyz', value: 'soundxyz' },
  { label: '/coop-recs', value: 'coop-recs' },
  { label: '/bangers', value: 'bangers' },
  // { label: '/tropicalhouse', value: 'tropicalhouse' },
];

export default function ChannelFilter() {
  const { filter: currentFilter, updateFilter } = useFeedProvider();

  const handleClick = (event: any) => {
    const selected = event.target.value;
    const isActiveFilter = selected === currentFilter.channel;
    updateFilter({ channel: isActiveFilter ? '' : selected });
  };

  return (
    <div className="flex flex-col sm:gap-2">
      <h2 className="text-lg font-semibold sm:mb-2">Channels</h2>
      <RadioGroup value={currentFilter.channel}>
        {channels.map((option) => {
          return (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem onClick={handleClick} value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
