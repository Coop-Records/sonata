'use server';
import { Address, getAddress } from 'viem';
import farcasterClient from './client';

const getVerifications = async (fid?: number) => {
  const verifications: Address[] = [];
  if (!fid) return verifications;

  const verificationsDataList = farcasterClient.listVerificationsByFid(fid);
  for await (const verification of verificationsDataList) {
    const data = verification.data.verificationAddEthAddressBody;
    const address = getAddress(data.address);
    verifications.push(address);
  }

  return verifications;
};

export default getVerifications;
