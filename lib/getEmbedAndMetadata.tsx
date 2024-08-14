import fetchMetadata from './fetchMetadata';
import findValidEmbed from './findValidEmbed';
import getPostByHash from './supabase/getPostByHash';

export async function getEmbedAndMetadata(hash: string) {
  const cast = await getPostByHash(hash);
  const embed = findValidEmbed(cast);
  const url: any = embed?.url;
  const metadata = await fetchMetadata(url, cast);
  return { cast, metadata };
}
