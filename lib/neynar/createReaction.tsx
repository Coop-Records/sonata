import { Address } from 'viem';

const createReaction = async (signer: string, target: Address) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      signer_uuid: signer,
      reaction_type: 'like',
      target: target,
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
