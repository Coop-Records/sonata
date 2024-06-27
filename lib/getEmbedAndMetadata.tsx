import fetchMetadata from './fetchMetadata';
import findValidEmbed from './findValidEmbed';
import { supabaseClient } from './supabase/client';

export async function getEmbedAndMetadata(fullHash: string) {
  const { data: cast } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('post_hash', fullHash)
    .single();

  const embed = findValidEmbed(cast);
  const url: any = embed?.url;
  const metadata = await fetchMetadata(url, cast);
  return { cast, metadata };
}
