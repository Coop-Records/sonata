import { CHANNELS } from '../consts';

export default function getChannelIdFromParentUrl(parentUrl?: string | null) {
  if (!parentUrl) return;
  const match = /\/channel\/([^/]+)$/.exec(parentUrl);
  if (match) return match[1];

  return CHANNELS.find((val) => val.parentUrl == parentUrl)?.value;
}
