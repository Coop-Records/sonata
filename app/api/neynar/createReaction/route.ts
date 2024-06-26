import getCastLikesCount from '@/lib/neynar/getCastLikesCount';
import hasUserLikedCast from '@/lib/neynar/hasUserLiked';
import verifySignerUUID from '@/lib/neynar/verifySigner';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { signer_uuid, reaction_type, target } = body;

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
    const { fid } = await verifySignerUUID(signer_uuid);

    let likes_count = await getCastLikesCount(target);
    const isFidIncluded = await hasUserLikedCast(target, fid);

    if (!isFidIncluded) {
      await fetch(`https://api.neynar.com/v2/farcaster/reaction?`, options);

      likes_count++;
      await supabase.from('posts').upsert(
        {
          post_hash: target,
          likes: likes_count,
        },
        {
          onConflict: 'post_hash',
        },
      );
    }

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
