import ChannelPage from '@/components/ChannelPage';
import { CHANNELS } from '@/lib/consts';

export async function generateStaticParams() {
  return CHANNELS.map((channel) => {
    return { channelId: channel.value };
  });
}

export default function Channel() {
  return <ChannelPage />;
}
