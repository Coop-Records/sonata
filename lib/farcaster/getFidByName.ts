'use server';
import farcasterClient from './client';

const getFidByName = async (username: string) => {
  const usernameProof = await farcasterClient.getUsernameProof(username);
  const fid = usernameProof?.fid;
  return fid;
};

export default getFidByName;
