import { CONTENT_PLATFORMS } from '@/lib/consts';
import postMusicEmbed from '@/lib/neynar/postMusicEmbed';
import getSpotifyWithAlternatives from '@/lib/spotify/getSpotifyWithAlternatives';
import upsertCast from '@/lib/supabase/upsertCast';
import { NeynarV2APIClient } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { NextRequest, NextResponse } from 'next/server';

const client = new NeynarV2APIClient(process.env.NEYNAR_API_KEY!);

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { signer_uuid, url } = body;

  const data = await postMusicEmbed(signer_uuid, url);

  try {
    if (!data?.cast?.hash) throw Error();

    const { cast } = await client.lookUpCastByHashOrWarpcastUrl(data.cast.hash, 'hash');

    const found = CONTENT_PLATFORMS
      .findIndex(ptfm => ptfm.title === 'spotify' && url?.includes(ptfm.url));

    if (found < 0) await upsertCast(cast);
    else {
      const [castwithAlternatives] = await getSpotifyWithAlternatives([cast]);
      upsertCast(castwithAlternatives as any);
    }
  } catch { /* empty */ }

  return NextResponse.json(
    {
      message: `success`,
      data,
    },
    { status: 200 },
  );
};

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
