import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { base } from 'viem/chains';
import HyperSub from '@/abis/hypersub.json';
import { createPublicClient, http } from 'viem';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
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

const updateSupabaseEntries = (
  users: { fid: number, hasBalance: boolean }[]
) => supabase.from('tips').upsert(
  users.map(user => {
    const now = user.hasBalance ? new Date().toISOString() : null;

    return { fid: user.fid, hypersub_subscribed_since: now };
  })
);

const processUsers = async (offset = 0, limit = 1000) => {
  const { data: fids, error } = await supabase
    .from('tips')
    .select('fid, wallet_address')
    .range(offset, offset + limit - 1);
  if (error) return { count: 0, error };

  const allBalances = await checkBalances(fids.flatMap((fid) => fid.wallet_address));

  const updated = await updateSupabaseEntries(fids.map((user, i) => {
    const balance = allBalances[i];
    const hasBalance = !!balance?.result;

    return { fid: user.fid, hasBalance };
  }));

  console.info('updated info:', updated.statusText, updated.count, updated.error);

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
