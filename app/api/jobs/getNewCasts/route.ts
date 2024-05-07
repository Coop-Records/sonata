import getFeedFromTime from '@/lib/neynar/getFeedFromTime';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { createClient } from '@supabase/supabase-js';
import { isEmpty } from 'lodash';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const processEntriesInBatches = async (entries: any[], batchSize = 50) => {
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    await Promise.all(batch.map((entry: any) => processSingleEntry(entry)));
  }
};

const processSingleEntry = async (cast: Cast) => {
  const address = cast?.author?.verifications ? cast?.author?.verifications : undefined;

  if (!isEmpty(address)) {
    console.log(cast);
    await createCast(cast);
  }
};

const getResponse = async (): Promise<NextResponse> => {
  const { data: cast_query_date } = await supabase
    .from('cast_query_date')
    .select('last_checked')
    .eq('id', 1)
    .single();
  const lastChecked = cast_query_date ? new Date(cast_query_date.last_checked) : new Date();

  const [spotify, soundCloud, soundxyz] = await Promise.all([
    getFeedFromTime('spotify.com/track', lastChecked),
    getFeedFromTime('soundcloud.com', lastChecked),
    getFeedFromTime('sound.xyz', lastChecked),
  ]);
  const allEntries: any[] = [];
  allEntries.push(...spotify, ...soundCloud, ...soundxyz);
  if (allEntries.length > 0) {
    await processEntriesInBatches(allEntries);
  }

  const newLastChecked = allEntries.reduce((max, cast) => {
    const current = new Date(cast.timestamp);
    return current > max ? current : max;
  }, lastChecked);

  await supabase.from('cast_query_date').upsert({ id: 1, last_checked: newLastChecked });
  return NextResponse.json({ message: 'success', allEntries }, { status: 200 });
};

async function createCast(cast: Cast) {
  const likes = (cast as any).reactions.likes_count;
  const parentUrl = cast.parent_url;
  let channelId = null;
  if (parentUrl) {
    const match = /\/channel\/([^/]+)$/.exec(parentUrl);
    if (match) {
      channelId = match[1];
    }
  }

  const { error } = await supabase.from('posts').upsert(
    {
      post_hash: cast.hash,
      likes,
      created_at: new Date(cast.timestamp),
      embeds: cast.embeds,
      author: cast.author,
      channelId,
    },
    {
      onConflict: 'post_hash',
    },
  );

  if (error) {
    console.error('Error calling function:', error);
    return null;
  }

  return { success: true };
}

export async function GET(): Promise<Response> {
  const response = await getResponse().catch((error) => {
    console.error('Error in background task:', error);
  });
  return response as NextResponse;
}

export const dynamic = 'force-dynamic';
