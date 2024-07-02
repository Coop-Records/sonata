import { supabaseServerClient } from "../supabase/serverClient";

const updateSupabaseEntry = (
  fid: number, hasBalance: boolean
) => supabaseServerClient.from('tips').update({
  fid,
  hypersub_subscribed_since: hasBalance ? new Date().toISOString() : null
});

export default updateSupabaseEntry;
