import { isEmpty } from 'lodash';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {


  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
   
  } as any;

  try {
    const queryParams = new URLSearchParams({
      channel_ids: 'music',
      with_recasts: 'true',
      viewer_fid: '3',
      with_replies: 'false',
      limit: '100',
      should_moderate:'false'
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/feed/channels??${queryParams}`,
      options,
    );
    const data = await response.json();
    return new Response(JSON.stringify(data), {
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
