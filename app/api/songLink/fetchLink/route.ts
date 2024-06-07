import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const url = req.nextUrl; 
  const trackUrl = url.searchParams.get('trackUrl');
  if (!trackUrl) return NextResponse.json({ errors: 'Missing trackUrl' }, { status: 422 })
  const endpoint = `https://api.song.link/v1-alpha.1/links?url=${trackUrl}&userCountry=US&songIfSingle=true`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } as any;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();

    if (response.ok) {
      if (data.errors) {
        console.error('SongLink Errors:', data.errors);
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

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
