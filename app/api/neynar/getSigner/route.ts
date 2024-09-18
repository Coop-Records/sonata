import createSigner from '@/lib/neynar/createSigner';

export async function GET(): Promise<Response> {
  try {
    const signer = await createSigner();
    return Response.json({ signer });
  } catch (error) {
    return Response.json({ error: 'getUser Failed' }, { status: 400 });
  }
}
