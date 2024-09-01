import formatSongLinks from '@/lib/songLink/formatSongLinks';
import getSongLinks from '@/lib/songLink/getSongLinks';
import { supabaseClient } from '@/lib/supabase/client';

const getAllPostsForSongLink = async (songLink: string) => {
  const { data: alternatives } = await getSongLinks(songLink);
  const songLinks = formatSongLinks(songLink, alternatives);
  const { data: posts } = await supabaseClient
    .rpc('get_posts_by_embeds', { search_embeds: songLinks })
    .select('*');
  return { posts, songLinks };
};

export default getAllPostsForSongLink;
