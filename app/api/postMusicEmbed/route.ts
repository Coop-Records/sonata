import postMusicEmbed from '@/lib/neynar/postMusicEmbed';
import sendBotCast from '@/lib/sonata/sendBotCast';
import upsertCast from '@/lib/supabase/upsertCast';
import { NextRequest } from 'next/server';

const getResponse = async (req: NextRequest) => {
  const body = await req.json();
  const { signer_uuid, url, channel_id } = body;

  if (!(signer_uuid && url))
    return Response.json({ message: 'signer_uuid & url required' }, { status: 400 });

  const data = await postMusicEmbed(signer_uuid, url, channel_id);

  if (!data?.success || !data?.cast?.hash) {
    return Response.json({ message: 'casting failed' }, { status: 400 });
  }
  console.log('new cast:', data);

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
  const { success } = await upsertCast(cast);

  if (!success) return Response.json({ message: 'successfuly casted', data }, { status: 200 });
  sendBotCast(cast);

  return Response.json(
    {
      message: 'successfuly casted and indexed',
      link: `/cast/${cast.author.username}/${cast.hash.substring(0, 8)}`,
    },
    { status: 307 },
  );
};

export async function POST(req: NextRequest) {
  return getResponse(req);
}
