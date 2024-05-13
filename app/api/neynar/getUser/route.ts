import { isEmpty } from 'lodash';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const fids = req.nextUrl.searchParams.get('fids') as string;

  if (isEmpty(fids)) {
    return new Response(JSON.stringify({ error: 'fids required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      fids,
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?${queryParams}`,
      options,
    );
    const { users } = await response.json();
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'getUser Failed' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
