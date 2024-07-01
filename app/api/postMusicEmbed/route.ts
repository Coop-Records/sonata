import postMusicEmbed from '@/lib/neynar/postMusicEmbed';
import sendBotCast from '@/lib/sonata/sendBotCast';
import upsertCast from '@/lib/supabase/upsertCast';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const getResponse = async (req: NextRequest) => {
  const body = await req.json();
  const { signer_uuid, url } = body;

  const data = await postMusicEmbed(signer_uuid, url);
  console.log('new cast:', data);

  try {
    if (!data?.cast?.hash) throw new Error('No hash provided');
    if (!data.cast?.author?.fid) throw new Error('No author provided');

    const cast: any = {
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
    await upsertCast(cast);
    sendBotCast(cast);

    return redirect(`/cast/${cast.author.username}/${cast.hash.substring(0, 8)}`);
  } catch (error) {
    console.error('Error:', error);
  }
  return Response.json({ message: 'success', data }, { status: 200 });
};

export async function POST(req: NextRequest) {
  return getResponse(req);
}