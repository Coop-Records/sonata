import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { base } from 'viem/chains';
import HyperSub from '@/abis/hypersub.json';
import { createPublicClient, http } from 'viem';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY as string;
const BASEAlchemyKey = process.env.BASE_ALCHEMY_KEY as string;
const hypersubContractAddress = process.env.HYPERSUB_CONTRACT_ADDRESS as `0x${string}`;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

const fetchUserData = async (fids: string[]): Promise<any> => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: NEYNAR_API_KEY },
  } as any;
  const queryParams = new URLSearchParams({ fids: fids.join(',') });

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?${queryParams}`,
    options,
  );
  return response.json();
};

const checkBalances = async (verifications: string[]): Promise<boolean> => {
  const BASEpublicServerClient = createPublicClient({
    chain: base,
    transport: http(`https://base-mainnet.g.alchemy.com/v2/${BASEAlchemyKey}`),
  });

  for (const address of verifications) {
    const balance = (await BASEpublicServerClient.readContract({
      address: hypersubContractAddress,
      abi: HyperSub,
      functionName: 'balanceOf',
      args: [address],
    })) as number;

    if (balance > 0) {
      return true;
    }
  }

  return false;
};

const updateSupabaseEntry = async (fid: string, hasBalance: boolean): Promise<void> => {
  const now = new Date().toISOString();
  const updateData = hasBalance
    ? { hypersub_subscribed_since: now }
    : { hypersub_subscribed_since: null };

  await supabase.from('tips').update(updateData).eq('fid', fid);
};

const getResponse = async (): Promise<NextResponse> => {
  'use server';
  const { data: fids, error } = await supabase.from('tips').select('fid');
  if (error) {
    return NextResponse.json({ message: 'Error retrieving fids', error }, { status: 500 });
  }

  const fidChunks = [];
  const chunkSize = 100;
  for (let i = 0; i < fids.length; i += chunkSize) {
    fidChunks.push(fids.slice(i, i + chunkSize));
  }

  for (const chunk of fidChunks) {
    const { users } = await fetchUserData(chunk.map((fid: any) => fid.fid));
    for (const user of users) {
      const hasBalance = await checkBalances(user.verifications);
      await updateSupabaseEntry(user.fid, hasBalance);
    }
  }

  return NextResponse.json({ message: 'success' }, { status: 200 });
};

export async function GET(): Promise<Response> {
  const response = await getResponse().catch((error) => {
    console.error('Error in background task:', error);
    return NextResponse.json({ message: 'Error in background task', error }, { status: 500 });
  });
  return response as NextResponse;
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
