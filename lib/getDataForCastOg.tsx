import { getChannelData } from './getChannelData';
import { getEmbedAndMetadata } from './getEmbedAndMetadata';
import { formatPoints } from './formatPoints';

export async function getDataForCastOg(hash: any) {
  const { cast, metadata } = await getEmbedAndMetadata(hash);

  const channelData = getChannelData(cast.channelId);

  const channelLabel = channelData?.label || '/sonata';
  const channelIcon = channelData?.icon || 'https://i.imgur.com/Xa4LjYA.jpeg';

  const points = formatPoints(cast.points);

  return {
    cast,
    metadata,
    channelLabel,
    channelIcon,
    points,
  };
}
