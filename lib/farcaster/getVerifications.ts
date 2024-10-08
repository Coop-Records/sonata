'use server';
import farcasterClient from './client';

const getVerifications = async (fid?: number) => {
  const verifications: string[] = [];
  if (!fid) return verifications;

  const verificationsDataList = farcasterClient.listVerificationsByFid(fid);
  for await (const verification of verificationsDataList) {
    const data = verification.data.verificationAddEthAddressBody;
    verifications.push(data.address);
  }

  return verifications;
};

export default getVerifications;
