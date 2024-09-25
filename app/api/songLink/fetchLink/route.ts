import getSongLinks from '@/lib/songLink/getSongLinks';
import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const url = req.nextUrl;
  const trackUrl = url.searchParams.get('trackUrl');
  if (!trackUrl) return NextResponse.json({ errors: 'Missing trackUrl' }, { status: 422 });

  try {
    const data = await getSongLinks(trackUrl);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
  }
};

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
