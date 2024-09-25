import { Address } from 'viem';
import { settingsStack } from './client';

const getIdentity = async (address: Address) => {
  const identify = await settingsStack.getTags(address, 'custom identity');
  return identify;
};

export default getIdentity;
