import { VERCEL_URL } from '@/lib/consts';
import getButtons from '@/lib/getButtons';
import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { getFarcasterConnectedAccount } from '@/lib/airstack/getFarcasterConnectedAccount';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  // TODO: Check posts from last 24 hours of spotify, soundcloud, and soundxyz
  return NextResponse.json({ message: 'success' }, { status: 200 });
};

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
