import getVerifications from '@/lib/farcaster/getVerifications';
import getStackPoints from '@/lib/sonata/getStackPoints';
import { eventStakeChannelFid } from '@/lib/stack/events';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const channelId = req.nextUrl.searchParams.get('channelId');
  const fid = Number(req.nextUrl.searchParams.get('fid'));

  try {
    if (!channelId || isNaN(fid)) throw Error('channelId and fid required');

    const verifications = await getVerifications(fid);

    const stakedAmount = -(await getStackPoints(
      verifications,
      eventStakeChannelFid(channelId, fid),
    ));

    return Response.json({ message: 'success', stakedAmount });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'failed';
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
