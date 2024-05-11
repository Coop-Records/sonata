import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { signer_uuid, reaction_type, target } = body;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: process.env.NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      signer_uuid,
      reaction_type,
      target,
    }),
  } as any;

  try {
    const response = await fetch(`https://api.neynar.com/v2/farcaster/reaction?`, options);
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ errors: 'Something went wrong' }, { status: 400 });
  }
};

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
