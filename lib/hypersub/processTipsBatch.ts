import { Address } from "viem";
import { supabaseServerClient } from "../supabase/serverClient";
import checkAddressBalances from "./checkAddressBalances";

async function processTipsBatch(fids: { fid: number; wallet_address: Address }[]) {
  const allBalances = await checkAddressBalances(fids.map((fid) => fid.wallet_address));

  const updates = [];

  for (let i = 0; i < fids.length; i++) {
    const fid = fids[i].fid;
    const hasBalance = !!allBalances[i]?.result;

    updates.push({ fid, subscribed_since: hasBalance ? new Date() : null });
  }

  const { error } = await supabaseServerClient.rpc('update_many_hypersub_subscribed', { updates });
  if (error) throw error;
}

export default processTipsBatch;
