import { VERCEL_URL } from '@/lib/consts';
import getButtons from '@/lib/getButtons';
import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { getFarcasterConnectedAccount } from '@/lib/airstack/getFarcasterConnectedAccount';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  let address
  try {
    const body: FrameRequest = await req.json();
    const { untrustedData } = body;
    const {fid} = untrustedData
    const response = await getFarcasterConnectedAccount(fid.toString())
    const firstSocial = response?.data?.Socials?.Social?.[0]
    const firstConnectedAccount = firstSocial?.connectedAddresses?.[0]?.address
    const fallback = firstSocial?.userAddress
    address = firstConnectedAccount || fallback
  } catch (error) {
    console.error('Error parsing JSON from request', error);
  }
  const buttons = getButtons(address);
  const imageSrc = `${VERCEL_URL}/api/images/collector/collections?address=${address}`
  const frame = {
    buttons,
    image: {
      src: imageSrc,
    },
    postUrl: `${VERCEL_URL}/api/frame`,
  } as any;

  return new NextResponse(getFrameHtmlResponse(frame));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
