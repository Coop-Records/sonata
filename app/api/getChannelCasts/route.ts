import getChannelsCasts from '@/lib/neynar/getChannelCasts';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('channelId');

  if (!id) return NextResponse.json({ message: 'channelId is required' }, { status: 422 });

  const { data: cast_query_date } = await supabase
    .from('cast_query_date')
    .select('lastcheck')
    .eq('id', 1)
    .single();

  const date = cast_query_date ? new Date(cast_query_date.lastcheck): undefined;

  const data = await getChannelsCasts(id, date);

  if (!Array.isArray(data)) return NextResponse.json(data, { status: 400 });

  return NextResponse.json({ casts: data, message: 'success' }, { status: 200 });
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
