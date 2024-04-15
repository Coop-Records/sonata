import { Address } from 'viem';

const getCastReactions = async (hash: Address) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      hash,
      types: 'like',
      limit: '25',
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/reactions/cast?${queryParams}`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getCastReactions;
