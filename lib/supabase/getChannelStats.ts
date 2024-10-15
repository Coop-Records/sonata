import { ChannelStats } from '@/types/ChannelStats';
import supabase from './serverClient';
import { CHANNELS } from '@/lib/consts';

async function getChannelStats(filterChannels = false) {
  const query = supabase.from('channel_stats').select('*');

  if (filterChannels)
    query.in(
      'channelId',
      CHANNELS.map((channel) => channel.value),
    );

  const { data: channelStats, error } = await query.returns<ChannelStats[]>();
  if (error) throw error;

  return channelStats;
}

export default getChannelStats;
