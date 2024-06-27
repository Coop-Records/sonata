import { CHANNELS } from './consts';

export function getChannelData(channelId: any) {
  return CHANNELS.find((channel) => channel.value === channelId);
}
