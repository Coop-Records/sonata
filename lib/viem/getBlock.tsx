import { CHAIN_ID } from '../consts';
import { getPublicClient } from './viem';

const getBlock = async (params: any) => {
  const publicClient = getPublicClient(CHAIN_ID);
  const block = await publicClient.getBlock(params);
  return block;
};

export default getBlock;
