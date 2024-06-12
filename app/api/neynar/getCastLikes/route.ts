import {  isEmpty } from 'lodash';
import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest): Promise<Response> {
  const hash = req.nextUrl.searchParams.get('hash') as string;
  const viewer_fid = req.nextUrl.searchParams.get('viewer_fid') as string;


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
        identifier: hash,
        type: "hash",
        viewer_fid: viewer_fid
  });

    const castData =   await axios({
      method: "GET",
      url:  `https://api.neynar.com/v2/farcaster/cast?${queryParams}`,
      headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
    }).then(function (response) {
      return response.data;
    });
    const likes = castData.cast?.reactions?.likes_count ? castData.cast.reactions.likes_count: 0;

    const viewContext = castData.cast.viewer_context.liked ? castData.cast.viewer_context.liked : false;

    return new Response(JSON.stringify({ likes_count: likes , viewContext: viewContext }), {
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
