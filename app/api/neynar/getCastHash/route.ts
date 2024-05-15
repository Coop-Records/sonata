import { isEmpty } from 'lodash';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const url = req.nextUrl.searchParams.get('url') as string;

  if (isEmpty(url)) {
    return new Response(JSON.stringify({ error: 'url required' }), {
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
      identifier: url,
      type: 'url',
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/cast?${queryParams}`,
      options,
    );
    const data = await response.json();

    return new Response(JSON.stringify({ hash: data.cast.hash }), {
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
