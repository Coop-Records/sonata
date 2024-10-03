'use server';
import privyClient from './privyClient';

async function getAllChannels() {
  const channels = await privyClient.getUsers();
  return channels;
}

export default getAllChannels;
