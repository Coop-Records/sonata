export default async function createPost(body: any) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: process.env.NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body,
  } as any;

  try {
    const response = await fetch(`https://api.neynar.com/v2/farcaster/cast?`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
