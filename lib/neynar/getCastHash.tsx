'use server';
const getCastHash = async (url: string) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      identifier: url,
      type: 'url',
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/cast?${queryParams}`,
      options,
    );
    const data = await response.json();
    return data.cast.hash;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getCastHash;
