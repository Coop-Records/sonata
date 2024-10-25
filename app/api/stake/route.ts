import { CHANNELS } from '@/lib/consts';
import getVerifications from '@/lib/farcaster/getVerifications';
import { stack } from '@/lib/stack/client';
import { eventStakeChannelFid } from '@/lib/stack/events';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const fid = Number(req.nextUrl.searchParams.get('fid'));
  if (!fid) throw Error('fid is required');

  try {
    const verifications = await getVerifications(fid);
    console.log(verifications);
    const points = await Promise.all(
      CHANNELS.map((channel) =>
        stack.getPoints(verifications, {
          event: eventStakeChannelFid(channel.value, fid),
        }),
      ),
    );

    const channelPoints = CHANNELS.map((channel, i) => {
      let totalPointsForChanel;
      console.log(points[i]);
      if (Array.isArray(points[i])) {
        totalPointsForChanel = Math.abs(
          points[i]?.reduce((total: any, curr: any) => total + curr?.amount, 0),
        );
      } else {
        totalPointsForChanel = Math.abs(points[i]);
      }
      return {
        channelId: channel.value,
        points: totalPointsForChanel,
      };
    });

    return Response.json({
      message: 'success',
      data: channelPoints.filter(({ points }) => points),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message }, { status: 400 });
  }
}
