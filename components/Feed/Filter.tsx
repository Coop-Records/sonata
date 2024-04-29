'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FeedFilter } from '@/types/FeedFilter';
import { usePathname } from 'next/navigation';
import Tabs from '@/components/Tabs';
import { Button } from '@/components/ui/button';

const platforms = [
  { label: 'Soundcloud', value: 'soundcloud' },
  { label: 'Spotify', value: 'spotify' },
  { label: 'Sound', value: 'sound.xyz' },
];

const tabs = [
  { label: 'Trending', href: '/', active: true },
  { label: 'Recent', href: '/recent' },
];

type FilterProps = {
  value: FeedFilter;
  onChange: (filter: FeedFilter) => void;
};

export default function Filter({ value, onChange }: FilterProps) {
  const pathname = usePathname();

  tabs.forEach((tab) => {
    tab.active = tab.href === pathname;
  });

  const handleClear = () =>
    onChange({
      platform: '',
    });
  return (
    <Card className="min-w-64">
      <CardHeader className="flex flex-col">
        <Tabs tabs={tabs} />
      </CardHeader>
      <CardContent>
        <h2 className="mb-2 text-lg font-semibold">Platform</h2>
        <RadioGroup value={value?.platform} onValueChange={(platform) => onChange({ platform })}>
          {platforms.map((platform) => {
            return (
              <div key={`platform-${platform.value}`} className="flex items-center space-x-2">
                <RadioGroupItem value={platform.value} id={platform.value} />
                <Label htmlFor={platform.value}>{platform.label}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleClear}>Clear</Button>
      </CardFooter>
    </Card>
  );
}
