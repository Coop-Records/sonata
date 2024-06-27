import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { CONTENT_PLATFORMS } from '../consts';
import getFeedFromTime from './getFeedFromTime';

type Platforms = (typeof CONTENT_PLATFORMS)[number]['title'];

const getPlatformFeedFromTime = async (lastChecked: Date) => {
  return (
    await Promise.all(
      CONTENT_PLATFORMS.map((ptfm) =>
        getFeedFromTime(ptfm.url, lastChecked).then((val) => ({ title: ptfm.title, data: val })),
      ),
    )
  ).reduce(
    (prev, { title, data }) => {
      if (prev[title]) prev[title] = prev[title].concat(data);
      else prev[title] = data;

      return prev;
    },
    {} as Record<Platforms, Cast[]>,
  );
};

export default getPlatformFeedFromTime;
