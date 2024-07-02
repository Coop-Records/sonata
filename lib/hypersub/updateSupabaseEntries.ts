import { supabaseServerClient as supabase } from "../supabase/client";

const updateSupabaseEntries = (
  users: { fid: number, hasBalance: boolean }[]
) => supabase.from('tips').upsert(
  users.map(user => {
    const now = user.hasBalance ? new Date().toISOString() : null;

    return { fid: user.fid, hypersub_subscribed_since: now };
  })
);

export default updateSupabaseEntries;
