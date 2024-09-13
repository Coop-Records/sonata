import { PrivyBatchUserResponse } from '@/types/Privy';
import getPrivyIdentifier from './getIdentifier';
import privyClient from './privyClient';

async function searchChannels(channelIds: string[]) {
  const PRIVY_LIMIT = 100;
  const channels = [];
  const body: any = { emails: channelIds.map((id) => getPrivyIdentifier(id)) };

  do {
    const response = await privyClient('/users/search', { body });
    if (!response.ok) throw Error(response.statusText);

    const json: PrivyBatchUserResponse = await response.json();

    if (!json?.data?.length) break;

    channels.push(...json.data);
    if (json?.data.length < PRIVY_LIMIT) break;

    body.cursor = json.next_cursor;
  } while (body?.cursor);

  return channels;
}

export default searchChannels;
