'use server';
import supabase from '@/lib/supabase/serverClient';
import privyClient from '@/lib/privy/privyClient';

const executeDegenTip = async (accessToken: string, amount: bigint, postHash: string) => {
  const verifiedClaims = await privyClient.verifyAuthToken(accessToken);
  const user = await privyClient.getUserById(verifiedClaims.userId);
  const tipperFid = user.farcaster?.fid;
  if (!tipperFid) throw Error('Invalid user');

  const { data: totalDegenOnPost, error } = await supabase.rpc('degen_tip_post', {
    tip_amount: amount,
    post_hash_input: postHash,
  });

  if (error) {
    console.error('Error calling function:', error);
    throw error;
  }
  return {
    usedTip: amount,
    totalTipOnPost: totalDegenOnPost,
  };
};

export default executeDegenTip;
