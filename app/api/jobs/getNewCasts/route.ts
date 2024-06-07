import createPostReply from '@/lib/neynar/createPostReply';
import getChannelIdFromCast from '@/lib/neynar/getChannelIdFromCast';
import getFeedFromTime from '@/lib/neynar/getFeedFromTime';
import getAlternativeLinks from '@/lib/songLink/getAlternativeLinks';
import getSongLinksFromCasts from '@/lib/spotify/getSongLinksFromCasts';
import mergeWithAlternatives from '@/lib/spotify/mergeWithAlternatives';
import filterByChannels from '@/lib/youtube/filterByChannels';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { createClient } from '@supabase/supabase-js';
import { isEmpty } from 'lodash';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
const BOT_SIGNER_UUID = process.env.BOT_SIGNER_UUID as string;

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

  const lastChecked = twoMinutesAgo;
  console.log("SWEETS lastChecked", lastChecked)

  const formattedLastChecked = new Date(`${lastChecked}`);

  const allEntries: any[] = [];

  console.log("SWEETS formattedLastChecked", formattedLastChecked)
  const [spotify, soundCloud, soundxyz, youtube] = await Promise.all([
    getFeedFromTime('spotify.com/track', formattedLastChecked),
    getFeedFromTime('soundcloud.com', formattedLastChecked),
    getFeedFromTime('sound.xyz', formattedLastChecked),
    getFeedFromTime('youtube.com/watch', formattedLastChecked),
  ]);
  allEntries.push( ...soundCloud, ...soundxyz);

  console.log("SWEETS USE SONG LINK", spotify)
  const spotifySongLinks = await getSongLinksFromCasts(spotify);
  console.log("SWEETS spotifySongLinks", spotifySongLinks)
  const spotifyAlternative = getAlternativeLinks(spotifySongLinks)
  console.log("SWEETS spotifyAlternative", spotifyAlternative)
  const spotifyWithAlternatives = mergeWithAlternatives(spotify, spotifyAlternative);
  console.log("SWEETS spotifyWithAlternatives", spotifyWithAlternatives)
  allEntries.push(...spotifyWithAlternatives);

  const youtubeFiltered = filterByChannels(youtube)
  console.log('jobs::getNewCasts', 'ytEntries', youtubeFiltered);
  allEntries.push(...youtubeFiltered);

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

async function createCast(cast: Cast) {
  const likes = (cast as any).reactions.likes_count;
  const alternativeEmbeds = (cast as any).alternativeEmbeds;
  console.log("SWEETS alternativeEmbeds", alternativeEmbeds)
  const channelId = getChannelIdFromCast(cast);

  const { error } = await supabase.from('posts').upsert(
    {
      post_hash: cast.hash,
      likes,
      created_at: new Date(cast.timestamp),
      embeds: cast.embeds,
      author: cast.author,
      channelId,
      alternativeEmbeds,
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

async function sendBotCast(cast: Cast) {
  await createPostReply(
    BOT_SIGNER_UUID,
    cast.hash,
    `This song is now available on @sonatatips where you earn NOTES when people tip you.\n\nSee you over there!\n\nhttps://sonata.tips/cast/${cast.author.username}/${cast.hash.substring(0, 8)}`,
  );

  return { success: true };
}

export async function GET(): Promise<Response> {
  const response = await getResponse().catch((error) => {
    console.error('Error in background task:', error);
  });
  return response as NextResponse;
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
