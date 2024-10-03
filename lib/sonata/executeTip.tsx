'use server';
import privyClient from '@/lib/privy/privyClient';
import executeUserTip from './tip/executeUserTip';

async function executeTip({
  accessToken,
  postHash,
  amount,
}: {
  accessToken: string;
  postHash: string;
  amount: number;
}) {
  const verifiedClaims = await privyClient.verifyAuthToken(accessToken);
  const user = await privyClient.getUserById(verifiedClaims.userId);
  const tipperFid = user.farcaster?.fid;
  if (!tipperFid) throw Error('Invalid user');

  return executeUserTip({ tipperFid, postHash, amount });
}

export default executeTip;
