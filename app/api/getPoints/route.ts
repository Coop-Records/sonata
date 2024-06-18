import { stack } from '@/lib/stack/client';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  // Retrieve the wallet_address from the query parameters
  const wallet_address = req.nextUrl.searchParams.get('wallet_address');

  if (!wallet_address) {
    return new Response(JSON.stringify({ error: 'wallet_address is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const currentBalance = await stack.getPoints(wallet_address);

  return new Response(JSON.stringify({ notes: currentBalance }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
