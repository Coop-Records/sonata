import getFeedFromTime from '@/lib/neynar/getFeedFromTime';
import { createClient } from '@supabase/supabase-js';
import { isEmpty } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { tipAmount, walletAddress, postHash } = body;

  console.log(tipAmount, walletAddress, postHash);

  // TODO: Add tip amount to post hash in post table

  return NextResponse.json(
    { message: 'success', tipRemaining: 0, totalTipOnPost: 0 },
    { status: 200 },
  );
};

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
