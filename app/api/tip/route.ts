import getFeedFromTime from '@/lib/neynar/getFeedFromTime';
import { createClient } from '@supabase/supabase-js';
import { isEmpty } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const { custody, message, signature, tipAmount, walletAddress } = req.body;

  // TODO: VERIFY THAT THIS IS A VALID SEND FROM A LOGGED IN USER

  const { data: tip_query_date, error: blockNumberError } = await supabase
    .from('tip_query_date')
    .select('last_checked')
    .eq('id', 1)
    .single();
  const lastChecked = tip_query_date ? new Date(tip_query_date.last_checked) : new Date();
  var newLastChecked = lastChecked;

  const [spotify, soundCloud, soundxyz] = await Promise.all([
    getFeedFromTime('spotify.com/track', lastChecked),
    getFeedFromTime('soundcloud.com', lastChecked),
    getFeedFromTime('sound.xyz', lastChecked),
  ]);

  const allEntries: any[] = [];

  allEntries.push(...spotify, ...soundCloud, ...soundxyz);

  const entries: Record<string, { fid: string; likes: number; posts: number; postDate: string }> =
    {};

  for (const cast of allEntries) {
    const likes = cast.reactions?.likes?.length ?? 0;
    const address = cast?.author?.verifications ? cast?.author?.verifications : undefined;
    const timestamp = cast?.timestamp;
    const fid = cast?.author?.fid;

    newLastChecked = newLastChecked < new Date(timestamp) ? new Date(timestamp) : newLastChecked;

    if (!isEmpty(address)) {
      if (entries[address]) {
        entries[address].likes += likes;
        entries[address].posts += 1;
        entries[address].postDate =
          new Date(timestamp) < new Date(entries[address].postDate)
            ? timestamp
            : entries[address].postDate;
      } else {
        entries[address] = { fid, likes, posts: 1, postDate: timestamp };
      }
    }
  }

  const numberOfEntries = Object.keys(entries).length;

  console.log('Number of keys in entries:', numberOfEntries);

  for (const key in entries) {
    if (entries.hasOwnProperty(key)) {
      const entry = entries[key];
      await callUpdateTips(key, entry.fid, entry.likes, entry.posts, entry.postDate);
    }
  }

  const { data, error } = await supabase.rpc('update_daily_tip_allocation');

  const { error: update_block_tracker_error } = await supabase
    .from('tip_query_date')
    .upsert({ id: 1, last_checked: newLastChecked });

  return NextResponse.json({ message: 'success' }, { status: 200 });
};

async function callUpdateTips(
  walletAddress: string,
  fid: string,
  totalLikes: number,
  numPosts: number,
  firstPostDate: string,
) {
  const firstPostDateISO = new Date(firstPostDate).toISOString();

  const { data, error } = await supabase.rpc('update_tips', {
    p_wallet_address: walletAddress,
    p_fid: fid,
    p_total_likes: totalLikes,
    p_num_posts: numPosts,
    p_first_post_date: firstPostDateISO,
  });

  if (error) {
    console.error('Error calling function:', error);
    return null;
  }

  console.log('Function called successfully, result:', data);
  return data;
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
