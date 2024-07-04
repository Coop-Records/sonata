import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const fid = req.nextUrl.searchParams.get('fid');
  if (!fid) return Response.json({ message: 'fid required' }, { status: 400 })

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
    next: {
      revalidate: 60,
    },
  } as any;

  try {
    const queryParams = new URLSearchParams({ fid, limit: '3' });

    const response = await fetch(`https://api.neynar.com/v2/farcaster/followers?${queryParams}`, options);
    const data = await response.json();
    const users = data?.users?.map((follower: any) => follower.user) ?? [];

    return Response.json({ users });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'getFollwers failed' }, { status: 500 });
  }
}
