import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { CHANNELS } from './consts';
import getChannelIdFromCast from './neynar/getChannelIdFromCast';

const filterCastsByChannels = (casts: Cast[]) =>
  casts.filter((entry) => {
    const channelId = getChannelIdFromCast(entry);
    return channelId && CHANNELS.find((channel) => channel.value === channelId);
  });

export default filterCastsByChannels;
