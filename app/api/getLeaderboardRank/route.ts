import { stack } from '@/lib/stack/client';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const wallet_address = req.nextUrl.searchParams.get('wallet_address');

  if (!wallet_address) {
    return new Response(JSON.stringify({ error: 'wallet_address is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const leaderBoard = await stack.getLeaderboardRank(wallet_address);

  return new Response(JSON.stringify({ leaderBoard: leaderBoard }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
