import { PrivyBatchUserResponse } from "@/types/Privy";
import privyClient from "./privyClient";

async function getAllChannels() {
  let cursor = null;
  const channels = [];
  const query = new URLSearchParams({ limit: '100' });

  do {
    const response = await privyClient('/users?' + query.toString(), { method: 'GET' });
    const json: PrivyBatchUserResponse = await response.json();
    if (!json?.data?.length) break;

    channels.push(...json.data);

    cursor = json.next_cursor;
    query.set('cursor', cursor ?? '');
  } while (cursor);

  return channels;
};

export default getAllChannels;
