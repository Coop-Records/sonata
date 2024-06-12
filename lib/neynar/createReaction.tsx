import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Address } from 'viem';

const createReaction = async (signer: Signer | null, target: Address, votes: number) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      signer: signer,
      reaction_type: 'like',
      target: target,
      votes: votes,
    }),
  } as any;

  try {
    const response = await fetch(`/api/neynar/createReaction`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default createReaction;
