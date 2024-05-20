import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get('fid') as string;
  console.log({ fid });
  let first = true,
    cursor = null;

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
    next: {
      revalidate: 60,
    },
  } as any;

  try {
    const params: any = { fid, limit: '100' };
    const users = [];
    while (first || cursor) {
      first = false;
      if (cursor) {
        params.cursor = cursor;
      }
      const queryParams = new URLSearchParams(params);

      const response = await fetch(
        `https://api.neynar.com/v2/farcaster/following?${queryParams}`,
        options,
      );
      const data = await response.json();
      if (data.users) {
        users.push(...data.users.map((user: any) => user.user));
      }
      cursor = data.next.cursor;
    }

    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'getFollowing Failed' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
