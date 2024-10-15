import extractAddresses from '@/lib/privy/extractAddresses';
import pregenerateChannelWallet from '@/lib/privy/pregenerateChannelWallet';
import getStakerAirdropEvents from '@/lib/sonata/channelWeeklyAirdrop/getStakerAirdropEvents';
import sortChannels from '@/lib/sortChannels';
import { stack } from '@/lib/stack/client';
import { eventAirdropChannel, eventTipChannel } from '@/lib/stack/events';
import getChannelStats from '@/lib/supabase/getChannelStats';
import supabase from '@/lib/supabase/serverClient';
import { EventPayloadWithEvent } from '@stackso/js-core';
import { NextRequest } from 'next/server';

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

    const airdropChannels = await Promise.all(
      sortedChannels.map(async (channel) => {
        const channelId = channel.channelId;

        const recentTips = channel.recentTips;
        const TIPS_DISTRIBUTED = channel.staked && recentTips > 0 ? Math.floor(recentTips / 2) : 0;
        const CHANNEL_AIRDROP = channel.staked ? Math.floor(AIRDROP_AMOUNT / 2) : AIRDROP_AMOUNT;
        const STAKERS_AIRDROP = channel.staked ? TIPS_DISTRIBUTED + CHANNEL_AIRDROP : 0;

        let account = channel.addresses?.[0];
        if (!account) {
          const result = await pregenerateChannelWallet(channel.channelId);
          account = extractAddresses(result.linkedAccounts)[0];
        }

        return {
          channelId,
          channelAirdropAmount: CHANNEL_AIRDROP,
          tipsDistributed: TIPS_DISTRIBUTED,
          stakersAirdropAmount: STAKERS_AIRDROP,
          account,
        };
      }),
    );

    const channelAirdropEvents: EventPayloadWithEvent[] = airdropChannels.map(
      ({ channelId, account, channelAirdropAmount }) => ({
        event: eventAirdropChannel(channelId),
        payload: { account, points: channelAirdropAmount },
      }),
    );

    const channelStakerAirdropEvents = await Promise.all(
      airdropChannels.map(getStakerAirdropEvents),
    );
    const stakerAirdropEvents = channelStakerAirdropEvents.flat();

    console.log(stakerAirdropEvents);

    const tipDistributeEvents: EventPayloadWithEvent[] = airdropChannels
      .filter(({ tipsDistributed }) => tipsDistributed > 0)
      .map(({ channelId, account, tipsDistributed }) => ({
        event: eventTipChannel(channelId),
        payload: { account, points: -tipsDistributed },
      }));

    const tipDistributeLogs = airdropChannels
      .filter(({ tipsDistributed }) => tipsDistributed > 0)
      .map(({ channelId, account, tipsDistributed }) => ({
        amount: -tipsDistributed,
        channelId,
        channelAddress: account,
      }));

    const channelAirdropRes = await stack.trackMany(channelAirdropEvents);
    const stakerAirdropRes = await stack.trackMany(stakerAirdropEvents);
    console.log(channelAirdropRes);
    console.log(stakerAirdropRes);

    if (tipDistributeEvents.length > 0) {
      const tipDistributeRes = await stack.trackMany(tipDistributeEvents);
      const tipDistributeLogsRes = await supabase
        .from('channel_tips_activity_log')
        .insert(tipDistributeLogs);
      console.log(tipDistributeRes);
      console.log(tipDistributeLogsRes);
    }

    return Response.json({ message: 'success', airdropChannels });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
