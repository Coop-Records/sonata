import { getFullHash } from './getFullHash';
import getUserByUsername from './neynar/getNeynarUserByUsername';
import { getChannelData } from './getChannelData';
import { getEmbedAndMetadata } from './getEmbedAndMetadata';
import { replaceSpecialCharacters } from './replaceSpecialCharacters';
import { formatPoints } from './formatPoints';

export async function getDataForCastOg(username: string, hash: any) {
  const fullHash: any = await getFullHash(username, hash);

  const encodedUsername = replaceSpecialCharacters(username);

  const userProfile = await getUserByUsername(username);
  const profilePfp = userProfile?.pfp?.url;

  const { cast, metadata } = await getEmbedAndMetadata(fullHash);
  const channelData = getChannelData(cast?.channelId);

  const channelLabel = channelData?.label || '/sonata';
  const channelIcon = channelData?.icon || 'https://i.imgur.com/Xa4LjYA.jpeg';

  const points = formatPoints(cast?.points);

  const soraSemiBold = fetch(new URL('/public/Sora-SemiBold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  const soraNormal = fetch(new URL('/public/Sora-Regular.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return {
    encodedUsername,
    profilePfp,
    metadata,
    channelLabel,
    channelIcon,
    points,
    soraSemiBold,
    soraNormal,
  };
}
