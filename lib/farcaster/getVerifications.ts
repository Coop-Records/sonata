'use server';
import { Address } from 'viem';
import farcasterClient from './client';

const getVerifications = async (fid?: number) => {
  const verifications: Address[] = [];
  if (!fid) return verifications;

  const verificationsDataList = farcasterClient.listVerificationsByFid(fid);
  for await (const verification of verificationsDataList) {
    const data = verification.data.verificationAddEthAddressBody;
    verifications.push(data.address as Address);
  }

  return verifications;
};

export default getVerifications;
