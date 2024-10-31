import Tabs from '@/components/Tabs';
import Feeds from './feeds';
import { FeedType } from '@/types/Feed';

const tabs = [
  { label: 'Following', value: FeedType.Following, auth: true },
  { label: 'Trending', value: FeedType.Trending },
  { label: 'Recent', value: FeedType.Recent },
];

export default function FeedsHome() {
  return (
    <div className="flex size-full flex-col gap-4">
      <Tabs tabs={tabs} />
      <div className="grow overflow-y-scroll">
        <Feeds />
      </div>
    </div>
  );
}
