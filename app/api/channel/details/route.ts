import supabase from '@/lib/supabase/serverClient';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const channelId = req.nextUrl.searchParams.get('channelId');

  try {
    if (!channelId) throw Error('channelId is required');

    const [topSong, balance, stakeStats] = await Promise.all([
      supabase
        .from('posts')
        .select('id,embeds,alternativeEmbeds')
        .eq('channelId', channelId)
        .order('points', { ascending: false })
        .limit(1)
        .single(),
      supabase.rpc('get_channel_tips_balance', {
        p_channelId: channelId,
      }),
      supabase
        .from('channel_stake_stats')
        .select('stakers,staked')
        .eq('channelId', channelId)
        .single(),
    ]);

    return Response.json({
      message: 'success',
      topSong: topSong.data,
      staking: stakeStats.data,
      balance: balance.data ?? 0,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'failed';
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
