import getFeedFromTime from '@/lib/neynar/getFeedFromTime';
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

const processSingleEntry = async (cast: {
  reactions: { likes: string | any[] };
  author: {
    power_badge: any;
    verifications: any;
    fid: any;
  };
  timestamp: any;
}) => {
  const likes = cast.reactions?.likes?.length ?? 0;
  const address = cast?.author?.verifications ? cast?.author?.verifications[0] : undefined;
  const powerBadge = cast?.author?.power_badge ?? false;
  const timestamp = cast?.timestamp;
  const fid = cast?.author?.fid;

  if (!isEmpty(address)) {
    await callUpdateTips(address, fid, likes, 1, timestamp, powerBadge);
  }
};

const getResponse = async (): Promise<NextResponse> => {
  'use server';
  const { data: tip_query_date } = await supabase
    .from('tip_query_date')
    .select('last_checked')
    .eq('id', 1)
    .single();
  console.log('jobs::update_tips', `Starting Job from ${tip_query_date?.last_checked}`);

  const lastChecked = tip_query_date ? tip_query_date.last_checked : '';
  const formattedLastChecked = new Date(`${lastChecked}`);

  const [spotify, soundCloud, soundxyz] = await Promise.all([
    getFeedFromTime('spotify.com/track', formattedLastChecked),
    getFeedFromTime('soundcloud.com', formattedLastChecked),
    getFeedFromTime('sound.xyz', formattedLastChecked),
  ]);

  const allEntries: any[] = [];

  allEntries.push(...spotify, ...soundCloud, ...soundxyz);

  await processEntriesInBatches(allEntries);

  const newLastChecked: string = allEntries.reduce((max, cast) => {
    const current = new Date(cast.timestamp as string);
    return current > new Date(max) ? cast.timestamp : max;
  }, lastChecked);

  console.log('jobs::update_tips', `About to call update_daily_tip_allocation`);
  await supabase.rpc('update_daily_tip_allocation');

  console.log('jobs::update_tips', `About to set last_checked to ${newLastChecked}`);
  await supabase.from('tip_query_date').upsert({ id: 1, last_checked: newLastChecked });

  return NextResponse.json({ message: 'success' }, { status: 200 });
};

async function callUpdateTips(
  walletAddress: string,
  fid: string,
  totalLikes: number,
  numPosts: number,
  firstPostDate: string,
  power_badge: boolean,
) {
  const firstPostDateISO = new Date(firstPostDate).toISOString();

  const { data, error } = await supabase.rpc('update_tips', {
    p_wallet_address: walletAddress,
    p_fid: fid,
    p_total_likes: totalLikes,
    p_num_posts: numPosts,
    p_first_post_date: firstPostDateISO,
    p_power_badge: power_badge,
  });

  if (error) {
    console.error('Error calling function:', error);
    return null;
  }

  console.log('Function called successfully, result:', data);
  return data;
}

export async function GET(): Promise<Response> {
  await getResponse().catch((error) => {
    console.error('Error in background task:', error);
  });
  return NextResponse.json({ message: 'success' }, { status: 200 });
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
