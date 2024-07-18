import combinePrivyAccountWithChannelStats from "@/lib/privy/combineAccountsWithStats";
import sortChannels from "@/lib/sortChannels";
import { stack } from "@/lib/stack/client";
import getChannelStats from "@/lib/supabase/getChannelStats";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const TOP_CHANNELS = 10;
  const TIP_AMOUNT = 11100;

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const channelStats = await getChannelStats(true);
  const channelStatsWithAddresses = await combinePrivyAccountWithChannelStats(channelStats);
  const sortedChannels = sortChannels(channelStatsWithAddresses);
  sortedChannels.splice(TOP_CHANNELS);

  const stacks = await Promise.all(sortedChannels.map((channel: any) => {
    const address = channel?.addresses?.[0];
    if (!address)
      return Promise.reject(`${channel.channelId} chanel address not found`);

    return stack.track(`weekly_channel_tip_to_${address}`, {
      account: address, points: TIP_AMOUNT
    });
  }));

  if (stacks.some(res => !res.success))
    return Response.json({ message: 'failed', stacks }, { status: 500 });

  return Response.json({ message: 'success', topChannels: sortedChannels });
}

export const dynamic = 'force-dynamic';