'use server';
import executeUserTip from './tip/executeUserTip';
import getFidFromToken from '../privy/getFidFromToken';

async function executeTip({
  accessToken,
  postHash,
  amount,
}: {
  accessToken: string;
  postHash: string;
  amount: number;
}) {
  const tipperFid = await getFidFromToken(accessToken);
  return executeUserTip({ tipperFid, postHash, amount });
}

export default executeTip;
