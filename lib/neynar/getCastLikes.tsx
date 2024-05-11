import { Address } from 'viem';

const getCastLikes = async (hash: Address) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      hash,
    });

    const response = await fetch(`/api/neynar/getCastLikes?${queryParams}`, options);
    const data = await response.json();
    return data.reactions;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getCastLikes;
