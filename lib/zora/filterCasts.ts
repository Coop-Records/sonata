import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import filterCastsByChannels from '../filterCastsByChannels';
import getIpfsLink from '../getIpfsLink';
import getCastsMetadataLink from './getCastsMetadataLink';
import getCastContractMapping from './mapCastToContract';

async function filterZoraFeed(casts: Cast[]) {
  const batchSize = 99;
  const castsMetadata: Response[] = [];
  const response: Cast[] = [];
  const filteredCasts = filterCastsByChannels(casts);

  try {
    const data = await getCastsMetadataLink(getCastContractMapping(filteredCasts));

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);

      castsMetadata.push(...await Promise.all(
        batch.map(cast => fetch(getIpfsLink(cast.ipfs)))
      ));
    }

    for (let i = 0; i < data.length; i++) {
      const cast = data[i];

      const metadata: {
        content?: {
          mime?: string;
          uri?: string
        }
      } = await castsMetadata[i].json();

      if (
        metadata &&
        metadata?.content &&
        metadata.content?.mime &&
        metadata.content?.uri &&
        metadata.content?.mime.includes('audio')
      ) {
        cast.embeds.unshift({ url: cast.ipfs });
        delete (cast as any).ipfs;
        response.push(cast as Cast);
      }
    }
    return response;
  } catch (error) {
    console.error('filterZoraFeed', 'ERROR', error);
    return [];
  }
}

export default filterZoraFeed;