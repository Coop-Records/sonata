import privyClient from './privyClient';

const getFidFromToken = async (accessToken: string) => {
  const verifiedClaims = await privyClient.verifyAuthToken(accessToken);
  const user = await privyClient.getUserById(verifiedClaims.userId);
  const fid = user.farcaster?.fid;
  if (!fid) throw Error('Invalid user');
  return fid;
};

export default getFidFromToken;
