import { CHANNELS } from '../consts';
import getChannelIdFromCast from '../neynar/getChannelIdFromCast';

const filterByChannels = (youtube: any) =>
  youtube.filter((entry: any) => {
    const channelId = getChannelIdFromCast(entry);
    return channelId && CHANNELS.find((channel) => channel.value === channelId);
  });

export default filterByChannels;
