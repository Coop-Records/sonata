import getBulkUsersByFid from '@/lib/neynar/getBulkUsersByFid';
import { isEmpty } from 'lodash';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const fids = req.nextUrl.searchParams.get('fids') as string;

  if (isEmpty(fids)) {
    return new Response(JSON.stringify({ error: 'fids required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const users = await getBulkUsersByFid(fids)
    return Response.json({ users });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'getUser Failed' }, { status: 400 });
  }
}
