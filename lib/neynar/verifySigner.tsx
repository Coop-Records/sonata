import { VerifiedSigner } from '@/types/VerifiedSigner';

export default async function verifySignerUUID(signer_uuid: string): Promise<VerifiedSigner> {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      signer_uuid,
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/signer?${queryParams}`,
      options,
    );
    const { status, fid } = await response.json();
    return { status, fid };
  } catch (error) {
    console.error(error);
    return { status: false, fid: 0 };
  }
}
