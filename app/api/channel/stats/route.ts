import { CHANNELS } from "@/lib/consts";
import combinePrivyAccountWithChannelStats from "@/lib/privy/combineAccountsWithStats";
import getChannelStats from "@/lib/supabase/getChannelStats";
import { ChannelStats } from "@/types/ChannelStats";

export async function GET() {
  try {
    const channelStats = await getChannelStats();
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

    return Response.json({
      message: 'success',
      channels: [...channelStatsWithAddresses, ...splitChannelStats[1]]
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
