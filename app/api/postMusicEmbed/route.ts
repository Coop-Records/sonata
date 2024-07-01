import postMusicEmbed from '@/lib/neynar/postMusicEmbed';
import sendBotCast from '@/lib/sonata/sendBotCast';
import upsertCast from '@/lib/supabase/upsertCast';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const getResponse = async (req: NextRequest) => {
  let cast: any;
  const body = await req.json();
  const { signer_uuid, url } = body;

  const data = await postMusicEmbed(signer_uuid, url);
  console.log('new cast:', data);

  try {
    if (!data?.cast?.hash) throw new Error('No hash provided');
    if (!data.cast?.author?.fid) throw new Error('No author provided');

    cast = {
      timestamp: new Date().toISOString(),
      parent_url: '',
      root_parent_url: '',
      reactions: {
        likes_count: 0,
      },
      hash: data.cast.hash,
      embeds: [{ url }],
      author: data.cast.author,
    };
    const { success } = await upsertCast(cast);
    if (success) sendBotCast(cast);

  } catch (error) {
    console.error('Error:', error);
    if (data?.success) return Response.json({ message: 'success', data }, { status: 200 });
    else return Response.json({ message: 'failed' }, { status: 400 });
  }

  redirect(`/cast/${cast.author.username}/${cast.hash.substring(0, 8)}`);
};

export async function POST(req: NextRequest) {
  return getResponse(req);
}