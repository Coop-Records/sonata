import getBulkUsersByAddress from '@/lib/neynar/getBlukUsersByAddress';
import { isEmpty } from 'lodash';
import { NextRequest } from 'next/server';
import { Address } from 'viem';

export async function GET(req: NextRequest): Promise<Response> {
  const address = req.nextUrl.searchParams.get('address') as string;

  if (isEmpty(address)) {
    return new Response(JSON.stringify({ error: 'address required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const users = await getBulkUsersByAddress(address as Address);
    return Response.json({ users });
  } catch (error) {
    return Response.json({ error: 'getUser Failed' }, { status: 400 });
  }
}
