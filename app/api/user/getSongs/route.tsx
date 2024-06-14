import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

const getResponse = async (profileFid: string): Promise<NextResponse> => {
  const { data: songs } = await supabase
    .from('posts')
    .select('*')
    .eq('authorFid', profileFid)
    .order('likes', { ascending: false });
  return NextResponse.json({ message: 'success', songs }, { status: 200 });
};

export async function GET(req: NextRequest): Promise<Response> {
  const profileFid = req.nextUrl.searchParams.get('profile_fid');
  if (!profileFid) return NextResponse.json({ errors: 'invalid param.' }, { status: 400 });

  const response = await getResponse(profileFid).catch((error) => {
    console.error('Error in background task:', error);
  });
  return response as NextResponse;
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
