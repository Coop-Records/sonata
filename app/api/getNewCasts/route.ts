import getCastLikes from '@/lib/neynar/getCastLikes';
import getFeed from '@/lib/neynar/getFeed';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { createClient } from '@supabase/supabase-js';
import { isEmpty } from 'lodash';
import { NextResponse } from 'next/server';
import { Address } from 'viem';

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
    await createCast(cast);
  }
};

const getResponse = async (): Promise<NextResponse> => {
  const [spotify, soundCloud, soundxyz] = await Promise.all([
    getFeed('spotify.com/track'),
    getFeed('soundcloud.com'),
    getFeed('sound.xyz'),
  ]);
  const allEntries: any[] = [];
  allEntries.push(...spotify.casts, ...soundCloud.casts, ...soundxyz.casts);
  await processEntriesInBatches(allEntries);
  return NextResponse.json({ message: 'success', allEntries }, { status: 200 });
};

async function createCast(cast: Cast) {
  const likes = await getCastLikes(cast.hash as Address);
  if ('error' in likes) {
    console.error('Error calling function:', likes.error);
    return null;
  }

  const parentUrl = cast.parent_url
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
      likes: likes.length,
      created_at: new Date(cast.timestamp),
      embeds: cast.embeds,
      author: cast.author,
      channelId
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
