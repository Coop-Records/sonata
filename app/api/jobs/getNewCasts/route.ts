import filterCastsByChannels from '@/lib/filterCastsByChannels';
import getPlatformFeedFromTime from '@/lib/neynar/getPlatformFeedFromTime';
import sendBotCast from '@/lib/sonata/sendBotCast';
import getSpotifyWithAlternatives from '@/lib/spotify/getSpotifyWithAlternatives';
import upsertCast from '@/lib/supabase/upsertCast';
import filterZoraFeed from '@/lib/zora/filterCasts';
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
    await upsertCast(cast);
    await sendBotCast(cast);
  }
};

const getResponse = async (): Promise<NextResponse> => {
  'use server';
  const { data: cast_query_date } = await supabase
    .from('cast_query_date')
    .select('lastcheck')
    .eq('id', 1)
    .single();
  console.log('jobs::getNewCasts', `Starting Job from ${cast_query_date?.lastcheck}`);

  const twoMinutesAgo = new Date(new Date().getTime() - 2 * 60 * 1000).toISOString();

  const lastChecked = cast_query_date ? cast_query_date.lastcheck : twoMinutesAgo;

  const formattedLastChecked = new Date(`${lastChecked}`);

  const feeds = await getPlatformFeedFromTime(formattedLastChecked);

  const spotifyWithAlternatives = await getSpotifyWithAlternatives(feeds.spotify);
  console.log('jobs::getNewCasts', 'spotifyEntries', spotifyWithAlternatives);

  const youtubeFiltered = filterCastsByChannels(feeds.youtube);
  console.log('jobs::getNewCasts', 'ytEntries', youtubeFiltered);

  const zoraFiltered = await filterZoraFeed(feeds.zora);
  console.log('jobs::getNewCasts', 'zoraEntriesCount', zoraFiltered.length);

  const allEntries: Cast[] = [
    ...feeds.soundcloud,
    ...feeds.soundxyz,
    ...spotifyWithAlternatives,
    ...youtubeFiltered,
    ...zoraFiltered,
  ];

  console.log('jobs::getNewCasts', `${allEntries.length} new entries`);
  if (allEntries.length > 0) {
    await processEntriesInBatches(allEntries);
  }

  let newLastChecked: string = allEntries.reduce((max, cast) => {
    const current = new Date(cast.timestamp as string);
    return current > new Date(max) ? cast.timestamp : max;
  }, lastChecked);

  console.log('jobs::getNewCasts', `About to set cast_query_date to ${newLastChecked}`);

  if (isEmpty(newLastChecked)) {
    newLastChecked = twoMinutesAgo;
  }

  const { data, error } = await supabase
    .from('cast_query_date')
    .upsert({ id: 1, last_checked: newLastChecked, lastcheck: newLastChecked });

  console.log(data, error);
  return NextResponse.json({ message: 'success', allEntries }, { status: 200 });
};

export async function GET(): Promise<Response> {
  const response = await getResponse().catch((error) => {
    console.error('Error in background task:', error);
  });
  return response as NextResponse;
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
