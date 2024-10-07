'use server';
import getPrivyIdentifier from './getIdentifier';
import privyClient from './privyClient';

async function searchChannels(channelIds: string[]) {
  const emails = channelIds.map((id) => getPrivyIdentifier(id));
  const channels = await privyClient.getUsers({ emails });
  return channels;
}

export default searchChannels;
