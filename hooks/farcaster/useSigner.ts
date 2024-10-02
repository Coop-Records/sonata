'use client';
import { useFarcasterSigner, usePrivy } from '@privy-io/react-auth';
import { ExternalEd25519Signer } from '@standard-crypto/farcaster-js-hub-rest';

const useSigner = () => {
  const { user } = usePrivy();
  const { requestFarcasterSignerFromWarpcast, getFarcasterSignerPublicKey, signFarcasterMessage } =
    useFarcasterSigner();

  const getSigner = async () => {
    const farcasterAccount = user?.farcaster;
    if (!farcasterAccount) {
      throw new Error('No farcaster account found');
    }

    if (!farcasterAccount.signerPublicKey) {
      await requestFarcasterSignerFromWarpcast();
      return null;
    }
    return new ExternalEd25519Signer(signFarcasterMessage, getFarcasterSignerPublicKey);
  };

  return { getSigner };
};

export default useSigner;
