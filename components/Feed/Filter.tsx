import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FeedFilter } from '@/types/FeedFilter';

const platforms = [
  { label: 'Soundcloud', value: 'soundcloud' },
  { label: 'Spotify', value: 'spotify' },
  { label: 'Sound.xyz', value: 'sound.xyz' },
];

type FilterProps = {
  value: FeedFilter;
  onChange: (filter: FeedFilter) => void;
};

export default function Filter({ value, onChange }: FilterProps) {
  return (
    <Card className="min-w-52">
      <CardHeader className="flex flex-col">
        <CardTitle>Filter</CardTitle>
        <CardDescription>Filter Casts</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="mb-2 font-semibold">Platform</h2>
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
    </Card>
  );
}
