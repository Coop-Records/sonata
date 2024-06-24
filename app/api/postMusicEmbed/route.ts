import { CONTENT_PLATFORMS } from '@/lib/consts';
import postMusicEmbed from '@/lib/neynar/postMusicEmbed';
import getSpotifyWithAlternatives from '@/lib/spotify/getSpotifyWithAlternatives';
import upsertCast from '@/lib/supabase/upsertCast';
import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { signer_uuid, url } = body;

  const data = await postMusicEmbed(signer_uuid, url);

  try {
    if (!data?.cast?.hash) throw Error('No hash provided');

    let cast: any = {
      ...data.cast,
      embeds: [{ url }],
      timestamp: new Date().toISOString(),
      parent_url: '',
      root_parent_url: '',
      reactions: {
        likes_count: 0,
      }
    };

    const found = CONTENT_PLATFORMS
      .findIndex(({ title, url }) => title === 'spotify' && url?.includes(url));

    if (found >= 0) [cast] = await getSpotifyWithAlternatives([cast]);

    upsertCast(cast);
  } catch (error) {
    console.error('api/postMusicEmbed::Error', error);
  }

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
