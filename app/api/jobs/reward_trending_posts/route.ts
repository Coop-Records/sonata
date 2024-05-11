import { StackClient } from '@stackso/js-core';
import { createClient } from '@supabase/supabase-js';
import { isNil } from 'lodash';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
const TIP_AWARD_PER = 2500;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const stack = new StackClient({
  apiKey: process.env.STACK_API_KEY as string,
  pointSystemId: Number(process.env.STACK_SYSTEM_ID),
});

const getResponse = async (): Promise<NextResponse> => {
  const topPosts = await fetchTopPosts();

  if (isNil(topPosts)) return NextResponse.json({ message: 'No top posts' }, { status: 400 });

  for (let i = 0; i < topPosts.length; i++) {
    const post = topPosts[i];
    const verifications = post.verifications;
    if (!isNil(verifications) && verifications.length > 0) {
      const authorWallet = verifications[0];
      stack.track(`trending_reward_${authorWallet}`, {
        account: authorWallet,
        points: TIP_AWARD_PER,
      });
    }
  }

  return NextResponse.json({ message: 'success' }, { status: 200 });
};

async function fetchTopPosts() {
  const { data, error } = await supabase
    .from('trending_posts')
    .select('*')
    .order('score', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching posts:', error);
    return null;
  }

  return data;
}

export async function GET(): Promise<Response> {
  await getResponse().catch((error) => {
    console.error('Error in background task:', error);
  });
  return NextResponse.json({ message: 'success' }, { status: 200 });
}

export const dynamic = 'force-dynamic';
