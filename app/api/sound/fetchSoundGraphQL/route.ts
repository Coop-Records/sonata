import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { query, variables } = body;

  const endpoint = 'https://api.sound.xyz/graphql';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Sound-Client-Key': process.env.SOUND_API_KEY,
  } as any;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        return NextResponse.json(data, { status: 400 });
      }

      return NextResponse.json(data, { status: 200 });
    } else {
      console.error(response.status, response.statusText);
      return NextResponse.json(data, { status: 400 });
    }
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json({ errors: 'Something went wrong' }, { status: 400 });
  }
};

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
