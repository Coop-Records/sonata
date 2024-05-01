export default async function postDegenTipComment(
  signer_uuid: string,
  degen_amount: number,
  post_hash: string,
) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      signer_uuid,
      text: `${degen_amount} $DEGEN`,
      parent: post_hash,
    }),
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
