import { Address, concat, getAddress, keccak256, toBytes } from 'viem';
import { SONG_MARKET_CONTRACT } from '@/lib/consts';

export const generateTokenAddress = (tokenId: number): Address => {
  const salt = keccak256(toBytes(`${tokenId}`));
  const addressBytes = keccak256(
    concat([toBytes('0xff'), toBytes(SONG_MARKET_CONTRACT), salt, toBytes('0x')]),
  ).slice(26);
  return getAddress(`0x${addressBytes}`);
};
