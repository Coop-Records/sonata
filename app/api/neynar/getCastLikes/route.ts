import { has, isEmpty } from 'lodash';
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
        identifier: hash,
        type: 'hash',
  });


     const castResponse = await fetch(
      `https://api.neynar.com/v2/farcaster/cast?${queryParams}`,
      options,
    );
    const castData = await castResponse.json();
    const likes = castData.cast?.reactions ? castData.cast?.reactions.likes: [];
    return new Response(JSON.stringify({ reactions: likes }), {
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
