import { supabaseServerClient } from "../supabase/serverClient";

const updateSupabaseEntries = (
  users: { fid: number, hasBalance: boolean }[]
) => supabaseServerClient.from('tips').upsert(
  users.map(user => {
    const now = user.hasBalance ? new Date().toISOString() : null;

    return { fid: user.fid, hypersub_subscribed_since: now };
  })
);

export default updateSupabaseEntries;
