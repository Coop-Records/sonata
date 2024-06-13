import getChannelsCasts from '@/lib/neynar/getChannelCasts';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('channelId');

  if (!id) return NextResponse.json({ message: 'channelId is required' }, { status: 422 });

  const data = await getChannelsCasts(id);

  if (!Array.isArray(data)) return NextResponse.json(data, { status: 400 });

  return NextResponse.json({ casts: data, message: 'success' }, { status: 200 });
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
