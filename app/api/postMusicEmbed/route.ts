import postMusicEmbed from '@/lib/neynar/postMusicEmbed';
import upsertCast from '@/lib/supabase/upsertCast';
import { NeynarV2APIClient } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { NextRequest } from 'next/server';

const client = new NeynarV2APIClient(process.env.NEYNAR_API_KEY!)

const getResponse = async (req: NextRequest) => {
  const body = await req.json();
  const { signer_uuid, url } = body;

  const data = await postMusicEmbed(signer_uuid, url);

  try {
    if (!data?.cast?.hash) throw new Error('No hash provided');
    if (!data.cast?.author?.fid) throw new Error('No author fid provided');

    const fid = Number(data.cast.author.fid);
    const { users } = await client.fetchBulkUsers([fid]);

    upsertCast({
      timestamp: new Date().toISOString(),
      parent_url: '',
      root_parent_url: '',
      reactions: {
        likes_count: 0,
      },
      ...data.cast,
      embeds: [{ url }],
      author: users[0],
    });
  } catch (error) {
    console.error('api/postMusicEmbed::Error', error);
  }

  return Response.json({ message: 'success', data }, { status: 200 });
};

export async function POST(req: NextRequest) {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
