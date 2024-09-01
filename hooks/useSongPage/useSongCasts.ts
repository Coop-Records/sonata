import getAllPostsForSongLink from "@/lib/sonata/song/getAllPostsForSongLink";
import { SupabasePost } from "@/types/SupabasePost";
import { useEffect, useState } from "react";

export default function useSongCasts(songLink: string, alternatives: Record<string, string>) {
  const [posts, setPosts] = useState<SupabasePost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllPostsForSongLink(songLink).then((response: any) => {
      if (Array.isArray(response.posts)) setPosts(response.posts);
      setLoading(false);
    })
  }, [alternatives, songLink]);

  return { posts, loading };
}