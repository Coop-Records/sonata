import combinePrivyAccountWithChannelStats from "@/lib/privy/combineAccountsWithStats";
import getChannelStats from "@/lib/supabase/getChannelStats";

export async function GET() {
  try {
    const channelStats = await getChannelStats();

    const channels = await combinePrivyAccountWithChannelStats(channelStats);

    return Response.json({ message: 'success', channels }, { status: 200 });
  } catch (error) {
    return Response.json(error ?? { message: 'failed' }, { status: 200 });
  }
}
