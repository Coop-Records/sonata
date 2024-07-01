import 'server-only';

import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import getChannelIdFromCast from '../neynar/getChannelIdFromCast';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

async function upsertCast(cast: Cast) {
  const likes = (cast as any).reactions.likes_count;
  const alternativeEmbeds = (cast as any).alternativeEmbeds;
  const channelId = getChannelIdFromCast(cast);

  const { error, statusText } = await supabaseClient.from('posts').upsert(
    {
      post_hash: cast.hash,
      likes,
      created_at: new Date(cast.timestamp),
      embeds: cast.embeds,
      author: cast.author,
      channelId,
      alternativeEmbeds,
      authorFid: cast.author.fid,
    },
    {
      onConflict: 'post_hash',
    },
  );
  if (error) {
    console.error('Error upserting cast:', error);
    return { success: false, statusText };
  }
  console.log(statusText, 'cast(hash):', cast.hash);
  return { success: true, statusText };
}

export default upsertCast;
