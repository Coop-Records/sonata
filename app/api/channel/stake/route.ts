import supabase from "@/lib/supabase/serverClient";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const channelId = req.nextUrl.searchParams.get('channelId');
  const fid = req.nextUrl.searchParams.get('fid');

  try {
    if (!channelId || !fid) throw Error('channelId and fid required');

    const { error, data } = await supabase
      .from('stake_activity_log')
      .select('stakedAmount:amount.sum()')
      .eq('fid', fid)
      .eq('channelId', channelId)
      .single();

    if (error) throw error;

    return Response.json({ message: 'success', ...data });
  } catch (error) {
    return Response.json({ message: 'failed' }, { status: 500 });
  }
}