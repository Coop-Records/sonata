import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import getChannelIdFromCast from '../neynar/getChannelIdFromCast';

const filterByChannels = (youtube: Cast[]) =>
  youtube.filter((entry: any) => {
    const channelId = getChannelIdFromCast(entry);
    return channelId;
  });

export default filterByChannels;
