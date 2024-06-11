import {  isEmpty } from 'lodash';
import { NextRequest } from 'next/server';
import axios from 'axios';

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

  try {
      const queryParams = new URLSearchParams({
        hash: hash,
        types: "likes",
        limit:"100"
  });

    const castData =   await axios({
      method: "GET",
      url:  `https://api.neynar.com/v2/farcaster/reactions/cast?${queryParams}`,
      headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
    }).then(function (response) {
      return response.data;
    });
    const likes = castData?.reactions ? castData.reactions: [];
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
