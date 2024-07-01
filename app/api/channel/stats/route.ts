import combinePrivyAccountWithChannelStats from "@/lib/privy/combineAccountsWithStats";
import getChannelStats from "@/lib/supabase/getChannelStats";

export async function GET() {
  try {
    const channelStats = await getChannelStats(false, true);
    console.log('channelStats count', channelStats.length);

    const channels = await combinePrivyAccountWithChannelStats(channelStats);
    console.log('channelStatsAddresses count', channels.length);

    return Response.json({ message: 'success', channels }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
