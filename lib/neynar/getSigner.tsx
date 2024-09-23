import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export default async function getSigner() {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const response = await fetch(`/api/neynar/getSigner`, options);
    const { signer } = await response.json();
    return signer as Signer;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
