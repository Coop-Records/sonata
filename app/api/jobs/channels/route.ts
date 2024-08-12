import distributeChannelStakerWeeklyAirdropAndTips from "@/lib/sonata/channelWeeklyAirdrop/distributeChannelStakerWeeklyAirdropAndTips";
import distributeChannelWeeklyAirdrop from "@/lib/sonata/channelWeeklyAirdrop/distributeChannelWeeklyAirdrop";
import sortChannels from "@/lib/sortChannels";
import { stack } from "@/lib/stack/client";
import { eventTipChannel } from "@/lib/stack/events";
import getChannelStats from "@/lib/supabase/getChannelStats";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const TOP_CHANNELS = 10;
  const AIRDROP_AMOUNT = 11111;

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const channelStats = await getChannelStats(true);
    const sortedChannels = sortChannels(channelStats);
    sortedChannels.splice(TOP_CHANNELS);

    const results = await Promise.all(sortedChannels.map(async (channel) => {
      const TIPS = Math.floor(channel.balance / 2);
      const CHANNEL_AIRDROP = channel.staked ? Math.floor(AIRDROP_AMOUNT / 2) : AIRDROP_AMOUNT;
      const STAKERS_AIRDROP = channel.staked ? TIPS + CHANNEL_AIRDROP : 0;
      const channelId = channel.channelId;

      const { account } = await distributeChannelWeeklyAirdrop(channel, CHANNEL_AIRDROP);

      if (STAKERS_AIRDROP) await distributeChannelStakerWeeklyAirdropAndTips(STAKERS_AIRDROP, channelId);

      if (TIPS) {
        const result = await stack.track(eventTipChannel(channelId), { account, points: -TIPS });
        if (!result.success) console.error(`${channelId} tip deduction failed`);
        console.log('distributeChannelTip', channelId, TIPS);
      }

      return {
        channelId,
        channelAirdropAmount: CHANNEL_AIRDROP,
        channelTips: TIPS,
        stakersAirdropAmount: STAKERS_AIRDROP
      };
    }));

    return Response.json({ message: 'success', topChannels: results });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';