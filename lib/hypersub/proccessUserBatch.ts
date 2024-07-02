import { supabaseServerClient } from "../supabase/serverClient";
import checkAddressBalances from "./checkAddressBalances";
import updateSupabaseEntry from "./updateSupabaseEntry";

const processUserBatch = async (offset = 0, limit = 1000) => {
  const { data: fids, error } = await supabaseServerClient
    .from('tips')
    .select('fid, wallet_address')
    .range(offset, offset + limit - 1);
  if (error) return { count: 0, error };

  const allBalances = await checkAddressBalances(fids.map((fid) => fid.wallet_address));

  let updateError;
  const chunkSize = 150;

  for (let i = 0; i < fids.length; i += chunkSize) {
    const fidChunk = fids.slice(i, i + chunkSize);
    const balancesChunk = allBalances.slice(i, i + chunkSize);

    await Promise.all(
      fidChunk.map(async (user, index) => {
        const balance = balancesChunk[index];
        const hasBalance = !!balance?.result;

        const result = await updateSupabaseEntry(user.fid, hasBalance);
        if (result.error) updateError = result.error;

        return { hasBalance, fid: user.fid };
      })
    );
  }
  return { count: fids.length, error: error ?? updateError };
};

export default processUserBatch;