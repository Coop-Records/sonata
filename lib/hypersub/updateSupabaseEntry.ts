import { supabaseServerClient } from "../supabase/serverClient";

const updateSupabaseEntry = (
  fid: number, hasBalance: boolean
) => supabaseServerClient.from('tips')
  .update({
    hypersub_subscribed_since: hasBalance ? new Date().toISOString() : null
  })
  .eq('fid', fid)
  .is('hypersub_subscribed_since', null);

export default updateSupabaseEntry;
