import { Address } from 'viem';
import { stack } from './client';

const getIdentify = async (address: Address) => {
  const identify = await stack.getTags(address, 'custom identity');
  return identify;
};

export default getIdentify;
