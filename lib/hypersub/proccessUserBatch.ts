import { supabaseServerClient } from "../supabase/serverClient";
import checkAddressBalances from "./checkAddressBalances";
import updateSupabaseEntries from "./updateSupabaseEntries";

const processUserBatch = async (offset = 0, limit = 1000) => {
  const { data: fids, error } = await supabaseServerClient
    .from('tips')
    .select('fid, wallet_address')
    .range(offset, offset + limit - 1);
  if (error) return { count: 0, error };

  const allBalances = await checkAddressBalances(fids.flatMap((fid) => fid.wallet_address));

  const updated = await updateSupabaseEntries(fids.map((user, i) => {
    const balance = allBalances[i];
    const hasBalance = !!balance?.result;

    return { fid: user.fid, hasBalance };
  }));

  console.info('updated info:', updated.statusText, updated.count, updated.error);

  return { count: fids.length, error };
};

export default processUserBatch;