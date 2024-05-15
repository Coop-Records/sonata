export default async function createPostReply(
  signer_uuid: string,
  parent_hash: string,
  message: string,
) {
  const body = JSON.stringify({
    signer_uuid,
    text: message,
    parent: parent_hash,
  });
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
