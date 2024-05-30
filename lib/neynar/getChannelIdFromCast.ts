import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export default function getChannelIdFromCast(cast: Cast) {
  const parentUrl = cast.parent_url;
  let channelId = null;
  if (parentUrl) {
    const match = /\/channel\/([^/]+)$/.exec(parentUrl);
    if (match) {
      channelId = match[1];
    }
  }
  return channelId;
}
