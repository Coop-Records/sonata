import fetchMetadata from './fetchMetadata';
import findValidEmbed from './findValidEmbed';
import getCastByHash from './supabase/getCastByHash';

export async function getEmbedAndMetadata(hash: string) {
  const cast = await getCastByHash(hash);
  const embed = findValidEmbed(cast);
  const url: any = embed?.url;
  const metadata = await fetchMetadata(url, cast);
  return { cast, metadata };
}
