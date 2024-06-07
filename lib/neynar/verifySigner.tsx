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
    const verified = status === 'approved' ? true : false;
    return { status: verified, fid };
  } catch (error) {
    console.error(error);
    return { status: false, fid: 0 };
  }
}
