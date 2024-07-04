import getUser from '@/lib/neynar/getNeynarUser';
import executeUserTip from '@/lib/sonata/tip/executeUserTip';
import getTipInfo from '@/lib/sonata/tip/getUserTipInfo';
import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { postHash, recipientFid } = body;

  const tipInfo = await getTipInfo(req);

  if (tipInfo.tipperFid === recipientFid) throw Error('Can not tip yourself');

  const recipientUser = await getUser(recipientFid);
  const recipientWalletAddress = recipientUser?.verifications?.find(Boolean);

  if (!recipientWalletAddress) throw Error('Invalid recipient');

  const result = await executeUserTip(postHash, { recipientFid, recipientWalletAddress }, tipInfo);

  return NextResponse.json({
    message: `Tipped ${tipInfo.allowableAmount} NOTES`,
    usedTip: tipInfo.allowableAmount,
    ...result,
  });
};

export async function POST(req: NextRequest) {
  return getResponse(req).catch(error => {
    const message = error instanceof Error ? error.message : 'Failed';
    return NextResponse.json({ message, usedTip: 0 }, { status: 400 });
  });
}

export const dynamic = 'force-dynamic';
