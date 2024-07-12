import supabase from "@/lib/supabase/serverClient";
import { NextRequest } from "next/server";

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
      supabase
        .from('channel_tips_activity_log')
        .select('balance:amount.sum()')
        .eq('channelId', channelId)
        .single(),
      supabase
        .from('channel_stake_stats')
        .select('stakers,staked')
        .eq('channelId', channelId)
        .single()
    ]);

    return Response.json({
      message: 'success',
      topSong: topSong.data,
      staking: stakeStats.data,
      balance: balance.data?.balance ?? 0
    });
  } catch (error) {
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}