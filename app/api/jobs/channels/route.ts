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
      const AIRDROP_AMOUNT_SHARE = channel.staked ? Math.floor(AIRDROP_AMOUNT / 2) : AIRDROP_AMOUNT;
      const TIPS = Math.floor(channel.balance / 2);
      const channelId = channel.channelId;

      const { account } = await distributeChannelWeeklyAirdrop(channel, AIRDROP_AMOUNT_SHARE);

      if (channel.staked) await distributeChannelStakerWeeklyAirdropAndTips(
        AIRDROP_AMOUNT_SHARE + TIPS,
        channelId
      );

      if (TIPS) {
        const result = await stack.track(eventTipChannel(channelId), { account, points: -TIPS });
        if (!result.success) console.error(`${channelId} tip deduction failed`);
        console.log('distributeChannelTip', channelId, TIPS);
      }

      return {
        channelId,
        channelAirdropAmount: AIRDROP_AMOUNT_SHARE,
        channelTips: TIPS,
        stakersAirdropAmount: AIRDROP_AMOUNT_SHARE + TIPS
      };
    }));

    return Response.json({ message: 'success', topChannels: results });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';