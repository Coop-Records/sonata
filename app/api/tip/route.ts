import getBulkUsersByFid from '@/lib/neynar/getBulkUsersByFid';
import verifySignerUUID from '@/lib/neynar/verifySigner';
import executeUserTip from '@/lib/sonata/tip/executeUserTip';
import getUserTipInfo from '@/lib/sonata/tip/getUserTipInfo';
import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const { postHash, recipientFid, signer_uuid, tipAmount, channelId } = await req.json();

  const { status, fid: tipperFid } = await verifySignerUUID(signer_uuid);
  if (!status) throw Error('Invalid Signer UUID');

  const tipInfo = await getUserTipInfo(tipperFid, tipAmount, channelId);

  if (tipInfo.tipperFid === recipientFid) throw Error('Can not tip yourself');

  const users = await getBulkUsersByFid([tipInfo.tipperFid, recipientFid]);
  const recipientWalletAddress = users?.find(user => user.fid == recipientFid)?.verifications?.find(Boolean);
  const tipperWalletAddress = users?.find(user => user.fid == tipInfo.tipperFid)?.verifications?.find(Boolean);

  if (!recipientWalletAddress) throw Error('Invalid recipient');

  const result = await executeUserTip(
    postHash, { recipientFid, recipientWalletAddress, tipperWalletAddress }, tipInfo
  );

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
