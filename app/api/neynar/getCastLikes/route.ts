import { isEmpty } from 'lodash';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const hash = req.nextUrl.searchParams.get('hash') as string;

  if (isEmpty(hash)) {
    return new Response(JSON.stringify({ error: 'hash required' }), {
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
      hash,
      types: 'likes',
      limit: '25',
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/reactions/cast?${queryParams}`,
      options,
    );
    const data = await response.json();

    return new Response(JSON.stringify({ reactions: data.reactions }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'getCastLikes Failed' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
