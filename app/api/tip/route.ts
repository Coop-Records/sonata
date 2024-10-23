import executeUserTip from '@/lib/sonata/tip/executeUserTip';
import getFidFromToken from '@/lib/privy/getFidFromToken';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { accessToken, postHash, amount } = await request.json();
    const tipperFid = await getFidFromToken(accessToken);
    const tipResponse = await executeUserTip({ tipperFid, postHash, amount });
    return Response.json(tipResponse);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unable to Tip!' },
      { status: 500 },
    );
  }
}
