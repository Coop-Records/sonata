import getChannelsCasts from '@/lib/neynar/getChannelCasts';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('channelId');
  const startDate = req.nextUrl.searchParams.get('startDate');

  if (!id) return NextResponse.json({ message: 'channelId is required' }, { status: 422 });

  let date: Date | undefined = new Date(startDate ?? '');
  date = isNaN(date.getTime()) ? undefined : date;

  const data = await getChannelsCasts(id, date);

  if (!Array.isArray(data)) return NextResponse.json(data, { status: 400 });

  return NextResponse.json({ casts: data, message: 'success' }, { status: 200 });
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
