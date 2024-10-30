import { stack } from '@/lib/stack/client';
import getVerifications from '@/lib/farcaster/getVerifications';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  // Retrieve the fid from the query parameters
  const fid = req.nextUrl.searchParams.get('fid');

  if (!fid) {
    return new Response(JSON.stringify({ error: 'wallet_address is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const verifications = await getVerifications(Number(fid));
  const points = await stack.getPoints(verifications);

  let notes = 0;
  if (Array.isArray(points)) {
    notes = points.reduce((acc, curr) => acc + curr.amount, 0);
  }

  return new Response(JSON.stringify({ notes }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
