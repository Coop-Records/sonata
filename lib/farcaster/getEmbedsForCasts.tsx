import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import parseEmbedUrl from '../zora/parseEmbedUrl';

const getEmbedsForCasts = (castArray: Cast[]) => {
  const parsedEmbeds = [] as any[];
  castArray.forEach((cast: Cast, castIndex: number) => {
    cast.embeds.forEach((embed: any, embedIndex: number) => {
      const parsed = parseEmbedUrl(embed.url);
      if (parsed) {
        parsedEmbeds.push({ castIndex, embedIndex, ...parsed });
      }
    });
  });
  return parsedEmbeds;
};

export default getEmbedsForCasts;
