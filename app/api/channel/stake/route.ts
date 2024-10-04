import getUser from '@/lib/neynar/getNeynarUser';
import getStackPoints from '@/lib/sonata/getStackPoints';
import { eventStakeChannelFid } from '@/lib/stack/events';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const channelId = req.nextUrl.searchParams.get('channelId');
  const fid = req.nextUrl.searchParams.get('fid');

  try {
    if (!channelId || !fid) throw Error('channelId and fid required');

    const user = await getUser(Number(fid));

    const stakedAmount = Math.abs(await getStackPoints(
      user.verifications,
      eventStakeChannelFid(channelId, user.fid)
    ));

    return Response.json({ message: 'success', stakedAmount });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'failed';
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
