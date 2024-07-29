import { CHANNELS } from "@/lib/consts";
import getUser from "@/lib/neynar/getNeynarUser";
import { stack } from "@/lib/stack/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get('fid');
  if (!Number(fid)) throw Error('fid is required');

  try {
    const user = await getUser(Number(fid));

    const points = await Promise.all(
      CHANNELS.map(channel => stack.pointsClient.getPoints({
        addresses: user.verifications,
        filter: { event: `channel_stake_${channel.value}_${fid}` }
      }))
    );

    const channelPoints = CHANNELS.map((channel, i) => ({
      channelId: channel.value,
      points: -points[i]?.allocations?.reduce(
        (total: any, curr: any) => total + curr?.points, 0
      ),
    }));

    return Response.json({
      message: 'success',
      data: channelPoints.filter(({ points }) => points)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message }, { status: 400 });
  }
}