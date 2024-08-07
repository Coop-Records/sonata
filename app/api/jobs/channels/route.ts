import processChannelReward from "@/lib/sonata/channelWeeklyAirdrop/processChannelReward";
import processStakersReward from "@/lib/sonata/channelWeeklyAirdrop/processStakersReward";
import sortChannels from "@/lib/sortChannels";
import { stack } from "@/lib/stack/client";
import { eventTipChannel } from "@/lib/stack/events";
import getChannelStats from "@/lib/supabase/getChannelStats";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const TOP_CHANNELS = 10;
  const AIRDROP_AMOUNT = 5555;
  const TIP_PERCENTAGE = .1;

  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const channelStats = await getChannelStats(true);
    const sortedChannels = sortChannels(channelStats);
    sortedChannels.splice(TOP_CHANNELS);

    await Promise.all(
      sortedChannels.map(async (channel) => {
        const channelId = channel.channelId;
        const { account } = await processChannelReward(channel, AIRDROP_AMOUNT);

        if (!channel.staked) return;

        const TIP_REWARDS = Math.ceil(channel.balance * TIP_PERCENTAGE);
        const TOTAL_REWARDS = AIRDROP_AMOUNT + TIP_REWARDS;

        await processStakersReward(TOTAL_REWARDS, channelId);

        if (!TIP_REWARDS) return;

        const result = await stack.track(eventTipChannel(channelId), { account, points: -TIP_REWARDS });
        if (!result.success) console.error(`${channelId} tip deduction failed`);
      })
    );

    return Response.json({ message: 'success', topChannels: sortedChannels });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';