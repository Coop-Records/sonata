import { PrivyBatchUserResponse } from "@/types/Privy";
import getPrivyIdentifier from "./getIdentifier";
import privyClient from "./privyClient";

async function searchChannels(channelIds: string[]) {
  let cursor = null;
  const channels = [];
  const query = new URLSearchParams({ limit: '100' });

  do {
    const response = await privyClient(
      '/users/search' + query.toString(),
      {
        body: { emails: channelIds.map(id => getPrivyIdentifier(id)) }
      }
    );
    const json: PrivyBatchUserResponse = await response.json();
    if (!json?.data?.length) break;

    channels.push(...json.data);

    cursor = json.next_cursor;
    query.set('cursor', cursor ?? '');
  } while (cursor);

  return channels;
};

export default searchChannels;
