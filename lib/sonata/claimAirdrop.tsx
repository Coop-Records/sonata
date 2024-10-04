'use server';
import { isNil } from 'lodash';
import supabase from '@/lib/supabase/serverClient';
import getFidFromToken from '@/lib/privy/getFidFromToken';
import getVerifications from '@/lib/farcaster/getVerifications';
import { stack } from '@/lib/stack/client';
import { eventAirdrop } from '@/lib/stack/events';

const claimAirdrop = async (accessToken: string | null) => {
  if (isNil(accessToken)) {
    throw new Error('Invalid Access Token');
  }

  const fid = await getFidFromToken(accessToken);
  const verifications = await getVerifications(fid);
  const walletAddress = verifications[0];

  if (isNil(walletAddress)) {
    throw new Error('Please verify an address on warpcast and try again');
  }

  const { data: airdropAmount, error } = await supabase.rpc('redeem_airdrop', {
    wallet_address_input: walletAddress,
  });
  if (error) {
    console.error('Error calling function:', error);
    throw new Error('Error redeeming airdrop');
  }

  if (airdropAmount > 0) {
    await stack.track(eventAirdrop(), { account: walletAddress, points: airdropAmount });
  }
  return { airdropAmount };
};

export default claimAirdrop;
