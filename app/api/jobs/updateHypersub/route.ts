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

const BASEpublicServerClient = createPublicClient({
  chain: base,
  transport: http(`https://base-mainnet.g.alchemy.com/v2/${BASEAlchemyKey}`),
});

const fetchUserData = async (fids: string[]) => {
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

const checkBalances = async (verifications: string[]) => {
  return BASEpublicServerClient.multicall({
    contracts: verifications.map(address => ({
      address: hypersubContractAddress,
      abi: HyperSub as any,
      functionName: 'balanceOf',
      args: [address],
    })),
    batchSize: 2000
  });
};

const updateSupabaseEntry = async (fid: number, hasBalance: boolean): Promise<void> => {
  const now = new Date().toISOString();
  const updateData = hasBalance
    ? { hypersub_subscribed_since: now }
    : { hypersub_subscribed_since: null };

  await supabase.from('tips').update(updateData).eq('fid', fid);
};

const processUsers = async (offset = 0, limit = 1000) => {
  const { data: fids, error } = await supabase
    .from('tips')
    .select('fid')
    .range(offset, offset + limit - 1);
  if (error) return { count: 0, error };

  const users = [];
  const chunkSize = 100; // neynar max : 100

  for (let i = 0; i < fids.length; i += chunkSize) {
    const chunk = fids.slice(i, i + chunkSize);
    const data = await fetchUserData(chunk.map((fid: any) => fid.fid));

    users.push(
      ...data.users.map((user: any) => (
        { fid: user.fid, verifications: user.verifications }
      ))
    );
  }

  const allBalances = await checkBalances(users.flatMap((user: any) => user.verifications));

  await Promise.all(users.map(async (user) => {
    const balances = allBalances.splice(0, user.verifications.length);
    const hasBalance = balances.some(result => result?.result);

    await updateSupabaseEntry(user.fid, hasBalance);
    return { fid: user.fid, hasBalance }; // Return result if needed
  }));

  return { count: fids.length, error };
};

const getResponse = async () => {
  let offset = 0;
  const limit = 1000;

  do {
    const { count, error } = await processUsers(offset);

    if (error) return Response.json(error, { status: 500 });
    if (count < limit) break;

    offset += limit;
  } while (offset)

  return Response.json({ message: 'success' });
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
