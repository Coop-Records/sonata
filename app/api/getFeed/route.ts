import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


const getResponse = async (): Promise<NextResponse> => {
  const { data } = await supabase
    .from('posts')
    .select()
    .order('created_at', { ascending: false })

  return NextResponse.json({ message: 'success', data }, { status: 200 });
};

export async function GET(): Promise<Response> {
  const response = await getResponse().catch((error) => {
    console.error('Error in background task:', error);
  });
  return response as NextResponse
}

export const dynamic = 'force-dynamic';
