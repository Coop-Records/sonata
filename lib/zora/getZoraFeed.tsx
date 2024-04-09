import getFeed from '../neynar/getFeed';
import getEmbedsForCasts from '../farcaster/getEmbedsForCasts';
import getMetadataForCollectionUrls from './getMetadataForCollectionUrls';

const getZoraFeed = async () => {
  const response = await getFeed('zora.co', 75);
  const parsedEmbeds = getEmbedsForCasts(response.casts);
  try {
    const metadataResponses = await getMetadataForCollectionUrls(parsedEmbeds);
    const onlyAudio = metadataResponses.filter((metadata) =>
      metadata?.content?.mime?.includes('audio'),
    );
    onlyAudio.forEach((metadata) => {
      const cast = response.casts[metadata.castIndex];
      if (cast && metadata.content.uri) {
        cast.embeds.push({ url: metadata.content.uri });
      }
    });

    response.casts = response.casts.filter((_: any, index: number) =>
      onlyAudio.some((metadata) => metadata.castIndex === index),
    );
  } catch (error) {
    console.error('Error fetching metadata for embeds:', error);
    throw error;
  }

  return response;
};

export default getZoraFeed;
