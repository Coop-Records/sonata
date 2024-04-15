import { Address } from 'viem';

const createReaction = async (signer: string, target: Address) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      signer_uuid: signer,
      reaction_type: 'like',
      target: target,
    }),
  } as any;

  try {
    const response = await fetch(`https://api.neynar.com/v2/farcaster/reaction?`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default createReaction;
