import Feeds from '@/app/(feeds)/feeds';
import ChannelDetails from '@/components/ChannelDetails';
import Tabs from '@/components/Tabs';
import { CHANNELS } from '@/lib/consts';
import { FeedType } from '@/types/Feed';

export async function generateStaticParams() {
  return CHANNELS.map((channel) => {
    return { channelId: channel.value };
  });
}

const tabs = [
  { label: 'Trending', value: FeedType.Trending },
  { label: 'Recent', value: FeedType.Recent },
];

export default function Channel({ params }: { params: { channelId: string } }) {
  const { channelId } = params;

  return (
    <div className="flex size-full flex-col gap-4">
      <ChannelDetails channelId={channelId} />
      <Tabs tabs={tabs} />
      <div className="grow overflow-y-scroll">
        <Feeds />
      </div>
    </div>
  );
}
