import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { CHANNELS } from './consts';
import getChannelIdFromParentUrl from './neynar/getChannelIdFromParentUrl';

const filterCastsByChannels = (casts: Cast[]) =>
  casts.filter((entry) => {
    const channelId = getChannelIdFromParentUrl(entry.parent_url);
    return channelId && CHANNELS.find((channel) => channel.value === channelId);
  });

export default filterCastsByChannels;
