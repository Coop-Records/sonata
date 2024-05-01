'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { usePathname } from 'next/navigation';
import Tabs from '@/components/Tabs';
import { Button } from '@/components/ui/button';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useMemo } from 'react';
import filterFeed from '@/lib/filterFeed';
import { FeedAvailableFilter } from '@/types/Feed';

const platforms = [
  { label: 'Soundcloud', value: 'soundcloud' },
  { label: 'Spotify', value: 'spotify' },
  { label: 'Sound', value: 'sound.xyz' },
];

const channels = [
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

const availableFilters: FeedAvailableFilter[] = [
  {
    name: 'Platform',
    key: 'platform',
    options: platforms,
  },
  {
    name: 'Channel',
    key: 'channel',
    options: channels,
  },
];

const tabs = [
  { label: 'Trending', href: '/', active: true },
  { label: 'Recent', href: '/recent' },
];

export default function Filter() {
  const { filter: currentFilter, updateFilter, feed } = useFeedProvider();
  const pathname = usePathname();

  tabs.forEach((tab) => {
    tab.active = tab.href === pathname;
  });

  const filters = useMemo(
    () =>
      availableFilters.map((filter) => ({
        ...filter,
        options: filter.options.filter(
          (option) => filterFeed(feed, { [filter.key]: option.value }).length > 0,
        ),
      })),
    [feed],
  );

  const handleClear = () =>
    updateFilter({
      platform: '',
      channel: '',
    });

  return (
    <Card className="min-w-64">
      <CardHeader className="flex flex-col">
        <Tabs tabs={tabs} />
      </CardHeader>
      <CardContent>
        {filters.map((filter) => {
          return (
            <div key={filter.name} className="mb-4">
              <h2 className="mb-2 text-lg font-semibold">{filter.name}</h2>
              <RadioGroup
                value={currentFilter[filter.key]}
                onValueChange={(value) => updateFilter({ [filter.key]: value })}
              >
                {filter.options.map((option) => {
                  return (
                    <div
                      key={`${filter.name}-${option.value}`}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleClear}>Clear</Button>
      </CardFooter>
    </Card>
  );
}
