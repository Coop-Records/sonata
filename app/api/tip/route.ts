import verifySignerUUID from '@/lib/neynar/verifySigner';
import executeUserTip from '@/lib/sonata/tip/executeUserTip';
import { isNil } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const { postHash, signer_uuid, tipAmount } = await req.json();

  if (isNil(signer_uuid)) throw Error('Invalid Signer');

  const { status, fid: tipperFid } = await verifySignerUUID(signer_uuid);
  if (!status) throw Error('Invalid Signer UUID');

  const result = await executeUserTip({
    postHash,
    tipperFid,
    amount: tipAmount,
  });

  return NextResponse.json({
    message: `Tipped ${tipAmount} NOTES`,
    usedTip: tipAmount,
    ...result,
  });
};

export async function POST(req: NextRequest) {
  return getResponse(req).catch((error) => {
    const message = error instanceof Error ? error.message : 'Unable to Tip';
    return NextResponse.json({ error: message }, { status: 400 });
  });
}

export const dynamic = 'force-dynamic';
