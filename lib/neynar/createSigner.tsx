async function createSigner() {
  const options = {
    method: 'POST',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  const response = await fetch(`https://api.neynar.com/v2/farcaster/signer`, options);

  const data = await response.json();
  return data;
}

export default createSigner;
