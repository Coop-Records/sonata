import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const url = req.nextUrl; 
  const fallback = "https://open.spotify.com/track/6HhFgEBHu25b8gy8Bl4eG0?si=g5nJh-F7RxqpxdvGhwhj1w&context=spotify%3Aalbum%3A1J60iwLlrXqJokziB4h19U"
  const trackUrl = url.searchParams.get('trackUrl') || fallback;
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
