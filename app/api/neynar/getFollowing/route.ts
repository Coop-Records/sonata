import getFollowing from '@/lib/neynar/getFollowing';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get('fid') as string;

  try {
    const following = await getFollowing(Number(fid));

    return new Response(JSON.stringify({ users: following }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'getFollowing Failed' }, { status: 500 });
  }
}
