export default async function verifySignerUUID(signer_uuid: string): Promise<boolean> {
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
    const { status } = await response.json();
    return status === 'approved';
  } catch (error) {
    console.error(error);
    return false;
  }
}
