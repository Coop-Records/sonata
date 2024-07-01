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
    .limit(11);

  if (error) {
    return NextResponse.json(
      { message: 'Error fetching latest tips', error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: 'Latest tips retrieved successfully', tips: data },
    { status: 200 },
  );
};
