import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { VERCEL_URL } from '@/lib/consts';
import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import axios from 'axios';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { signer, reaction_type, target } = body;
  const { signer_uuid } = signer as Signer;


  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: process.env.NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      signer_uuid,
      reaction_type,
      target,
    }),
  } as any;

  try {
    const queryParams = new URLSearchParams({
      hash: target,
      viewer_fid: signer?.fid,
    });


    const response =   await axios({
      method: "GET",
      url:  `${VERCEL_URL}/api/neynar/getCastLikes?${queryParams}`,
      headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
    }).then(function (response) {
      return response.data;
    });

   console.log(response)
   console.log(target)


    const data = await response;
    let likes_count = data.likes_count;
    console.log(data.viewContext)
    const viewContext = data.viewContext;
   
    if (!viewContext) {
        likes_count++
        await fetch(`https://api.neynar.com/v2/farcaster/reaction?`, options)
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.error('error:' + err));
    }
    await supabase.from('posts').upsert(
      {
        post_hash: target,
        likes: likes_count,
      },
      {
        onConflict: 'post_hash',
      },
    );

    return NextResponse.json({ success: true, likes: likes_count }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ errors: 'Something went wrong' }, { status: 400 });
  }
};

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
