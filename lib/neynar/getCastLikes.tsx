import { Address } from 'viem';

const getCastLikes = async (hash: Address, signer: number | undefined) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      hash,
      viewer_fid: signer ? signer.toString() : '3',
    });

    const response = await fetch(`/api/neynar/getCastLikes?${queryParams}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getCastLikes;
