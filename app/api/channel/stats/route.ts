import { CHANNELS } from "@/lib/consts";
import combinePrivyAccountWithChannelStats from "@/lib/privy/combineAccountsWithStats";
import sortChannels from "@/lib/sortChannels";
import getChannelStats from "@/lib/supabase/getChannelStats";
import { ChannelStats } from "@/types/ChannelStats";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const applyChannelFilter = req.nextUrl.searchParams.get('apply_channel_filter');
  const onlyChannelIds = req.nextUrl.searchParams.get('only_channel_ids');

  try {
    const channelStats = await getChannelStats(!!applyChannelFilter);
    console.log('channelStats count', channelStats.length);

    const splitChannelStats = channelStats.reduce<
      [ChannelStats[], ChannelStats[]]
    >((previous, current) => {
      const inChannels = CHANNELS.some(channel => channel.value === current.channelId);
      if (inChannels) previous[0].push(current);
      else previous[1].push(current);

      return previous;
    }, [[], []]);

    const channelStatsWithAddresses =
      await combinePrivyAccountWithChannelStats(splitChannelStats[0]);
    console.log('channelStatsWithAddresses count', channelStatsWithAddresses.length);

    const allChannelStats = sortChannels([...channelStatsWithAddresses, ...splitChannelStats[1]]);
    const channels = onlyChannelIds ? allChannelStats.map(channel => channel.channelId) : allChannelStats;

    return Response.json({ message: 'success', channels });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
