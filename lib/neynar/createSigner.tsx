const createSigner = async () => {
  const options = {
    method: 'POST',
    headers: { accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY },
  } as any;

  try {
    const response = await fetch(`https://api.neynar.com/v2/farcaster/signer`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default createSigner;
