import { CHANNELS } from './consts';

const getParentUrlFromChannelId = (channelId?: string) => {
  if (!channelId) return;
  const channel = CHANNELS.find((channel) => channel.value == channelId);
  return channel?.parentUrl || `https://warpcast.com/~/channel/${channelId}`;
};

export default getParentUrlFromChannelId;
