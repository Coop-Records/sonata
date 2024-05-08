import getFeedFromTime from '@/lib/neynar/getFeedFromTime';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { createClient } from '@supabase/supabase-js';
import { isEmpty } from 'lodash';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

const processEntriesInBatches = async (entries: any[], batchSize = 50) => {
  console.log('jobs::getNewCasts', `${entries.length} new entries being added`);
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    await Promise.all(batch.map((entry: any) => processSingleEntry(entry)));
  }
};

const processSingleEntry = async (cast: Cast) => {
  const address = cast?.author?.verifications ? cast?.author?.verifications : undefined;

  if (!isEmpty(address)) {
    await createCast(cast);
  }
};

const getResponse = async (): Promise<NextResponse> => {
  const { data: cast_query_date } = await supabase
    .from('cast_query_date')
    .select('lastcheck')
    .eq('id', 1)
    .single();
  console.log('jobs::getNewCasts', `Starting Job from ${cast_query_date?.lastcheck}`);

  const lastChecked = cast_query_date ? cast_query_date.lastcheck : '';

  const formattedLastChecked = new Date(`${lastChecked}`);

  const [spotify, soundCloud, soundxyz] = await Promise.all([
    getFeedFromTime('spotify.com/track', formattedLastChecked),
    getFeedFromTime('soundcloud.com', formattedLastChecked),
    getFeedFromTime('sound.xyz', formattedLastChecked),
  ]);
  const allEntries: any[] = [];
  allEntries.push(...spotify, ...soundCloud, ...soundxyz);

  console.log('jobs::getNewCasts', `${allEntries.length} new entries`);
  if (allEntries.length > 0) {
    await processEntriesInBatches(allEntries);
  }

  const newLastChecked: string = allEntries.reduce((max, cast) => {
    const current = new Date(cast.timestamp as string);
    return current > new Date(max) ? cast.timestamp : max;
  }, lastChecked);

  console.log('jobs::getNewCasts', `About to set cast_query_date to ${newLastChecked}`);

  const { data, error } = await supabase
    .from('cast_query_date')
    .upsert({ id: 1, last_checked: newLastChecked, lastcheck: newLastChecked });

  console.log(data, error);
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

  console.log('jobs::getNewCasts', `Successfully created/updated ${cast.hash}`);

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
