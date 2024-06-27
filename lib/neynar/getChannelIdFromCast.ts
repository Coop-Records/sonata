import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { CHANNELS } from '../consts';

export default function getChannelIdFromCast(cast: Cast) {
  const parentUrl = cast.parent_url;
  const rootParentUrl = (cast as any)?.root_parent_url;

  if (parentUrl) {
    const match = /\/channel\/([^/]+)$/.exec(parentUrl);
    if (match) return match[1];

    return CHANNELS.find((val) => val.parentUrl == parentUrl)?.value ?? null;
  }
  if (rootParentUrl) {
    return CHANNELS.find((val) => val.parentUrl == rootParentUrl)?.value ?? null;
  }
  return null;
}
