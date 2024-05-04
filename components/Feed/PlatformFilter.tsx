'use client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFeedProvider } from '@/providers/FeedProvider';

const platforms = [
  { label: 'Soundcloud', value: 'soundcloud' },
  { label: 'Spotify', value: 'spotify' },
  { label: 'Sound', value: 'sound' },
];

export default function PlatformFilter() {
  const { filter: currentFilter, updateFilter } = useFeedProvider();

  const handleClear = () =>
    updateFilter({
      platform: '',
      channel: '',
    });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Platform</h2>
      <RadioGroup
        value={currentFilter.platform}
        onValueChange={(value) => updateFilter({ platform: value })}
      >
        {platforms.map((option) => {
          return (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
      <Button className="self-start" onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
}
