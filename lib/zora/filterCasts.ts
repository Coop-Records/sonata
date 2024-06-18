import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import getCastsMetadataLink from './getCastsMetadataLink';
import getCastContractMapping from './mapCastToContract';

async function filterZoraFeed(casts: Cast[]) {
  try {
    const data = await getCastsMetadataLink(getCastContractMapping(casts));

    const castsMetadata = await Promise.all(data.map(cast => (
      fetch(`https://cloudflare-ipfs.com/${cast.ipfs}`, { cache: 'force-cache' })
    )));

    const response: Cast[] = [];

    for (let index = 0; index < data.length; index++) {
      const cast = data[index];

      const metadata: {
        content?: {
          mime?: string;
          uri?: string
        }
      } = await castsMetadata[index].json();

      if (
        metadata &&
        metadata?.content &&
        metadata.content?.mime &&
        metadata.content?.uri &&
        metadata.content?.mime.includes('audio')
      ) {
        cast.embeds.unshift({ url: metadata.content?.uri });
        delete (cast as any).ipfs;
        response.push(cast as Cast);
      }
    }
    return response;
  } catch {
    return [];
  }
}

export default filterZoraFeed;