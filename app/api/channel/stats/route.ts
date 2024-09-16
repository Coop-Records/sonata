import sortChannels from '@/lib/sortChannels';
import getChannelStats from '@/lib/supabase/getChannelStats';
import getFidChannelStats from '@/lib/supabase/getFidChannelStats';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const applyChannelFilter = req.nextUrl.searchParams.get('apply_channel_filter');
  const onlyChannelIds = req.nextUrl.searchParams.get('only_channel_ids');
  const fid = req.nextUrl.searchParams.get('fid');

  try {
    if (fid) {
      const data = await getFidChannelStats(fid);
      return Response.json({ message: 'success', data });
    } else {
      const channelStats = await getChannelStats(!!applyChannelFilter);
      console.log('channelStats count', channelStats.length);

      const allChannelStats = sortChannels(channelStats);
      const channels = onlyChannelIds
        ? allChannelStats.map((channel) => channel.channelId)
        : allChannelStats;

      return Response.json({ message: 'success', channels });
    }
  } catch (error) {
    console.error('Error:', error);
    const message = (error as any)?.message ?? 'failed';
    return Response.json({ message }, { status: 400 });
  }
}
