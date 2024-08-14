import { supabaseClient } from "@/lib/supabase/client";
import { SupabasePost } from "@/types/SupabasePost";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

export default function useSongCasts(songLink: string, alternatives: Record<string, string>) {
  const [posts, setPosts] = useState<SupabasePost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isEmpty(alternatives)) return;

    const embeds = Object.values(alternatives).concat(songLink);
    supabaseClient
      .rpc('get_posts_by_embeds', { search_embeds: embeds })
      .select('*')
      .then(({ data }) => {
        if (Array.isArray(data)) setPosts(data);
        setLoading(false);
      });
  }, [alternatives]);

  return { posts, loading };
}