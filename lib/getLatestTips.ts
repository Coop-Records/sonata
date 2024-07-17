import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getLatestTips = async (): Promise<NextResponse> => {
  const { data, error } = await supabase
    .from('tips_activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);


  if (error) {
    return NextResponse.json(
      { message: 'Error fetching latest tips', error: error.message },
      { status: 500 },
    );
  }
  const LIMIT = 11;
  const MAX_SENDER_APPEARANCE = 2;
  const result = [];
  const senderCounts = new Map<string, number>();

  for (const item of data) {
    const count = senderCounts.get(item.sender) ?? 0;

    if (count < MAX_SENDER_APPEARANCE) {
      senderCounts.set(item.sender, count + 1);
      result.push(item);

      if (result.length >= LIMIT) break;
    }
  }
  return NextResponse.json(
    { message: 'Latest tips retrieved successfully', tips: result },
    { status: 200 },
  );
};
