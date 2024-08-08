import getUser from '@/lib/neynar/getNeynarUser';
import verifySignerUUID from '@/lib/neynar/verifySigner';
import getStackPoints from '@/lib/sonata/getStackPoints';
import executeChannelStake from '@/lib/sonata/staking/executeChannelStake';
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

export async function POST(req: NextRequest) {
  try {
    const { signer_uuid, amount, channelId } = await req.json();
    if (!channelId) throw Error('channelId required');
    if (!isFinite(amount)) throw Error('stakeAmount required');
    if (!signer_uuid) throw Error('signer_uuid required');

    const { status, fid } = await verifySignerUUID(signer_uuid);
    if (!status) throw Error('Invalid Signer UUID');

    const data = await executeChannelStake(channelId, amount, fid);

    return Response.json({ message: `Staked ${amount} NOTES`, ...data });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message, usedAmount: 0 }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
