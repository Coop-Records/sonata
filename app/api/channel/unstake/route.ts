import verifySignerUUID from '@/lib/neynar/verifySigner';
import executeChannelUnstake from '@/lib/sonata/staking/executeChannelUnstake';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { signer_uuid, amount, channelId } = await req.json();
    if (!channelId) throw Error('channelId required');
    if (!isFinite(amount)) throw Error('amount required');
    if (!signer_uuid) throw Error('signer_uuid required');

    const { status, fid } = await verifySignerUUID(signer_uuid);
    if (!status) throw Error('Invalid Signer UUID');

    const data = await executeChannelUnstake(channelId, amount, fid);

    return Response.json({ message: `Unstaked ${amount} NOTES`, ...data });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message, usedAmount: 0 }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
