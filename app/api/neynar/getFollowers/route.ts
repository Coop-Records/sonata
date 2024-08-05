import getFollowers from '@/lib/neynar/getFollowers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const fid = req.nextUrl.searchParams.get('fid');
  if (!fid) return Response.json({ message: 'fid required' }, { status: 400 });

  try {
    const followers = getFollowers(Number(fid));

    return Response.json({ users: followers });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'getFollowers failed' }, { status: 500 });
  }
}
