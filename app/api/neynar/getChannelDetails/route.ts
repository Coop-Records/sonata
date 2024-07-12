import { NextRequest } from "next/server";

const options: any = {
  method: 'GET',
  headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY }
};

export async function GET(req: NextRequest) {
  const channelId = req.nextUrl.searchParams.get('channelId');

  try {
    if (!channelId) throw Error('channelId is required');

    const queryParams = new URLSearchParams({ id: channelId, type: 'id' });

    const response = await fetch('https://api.neynar.com/v2/farcaster/channel?' + queryParams.toString(), options);

    if (!response.ok) throw Error(response.statusText);

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return Response.json(error, { status: 500 });
    return Response.json({ message: 'Failed to get channel details' }, { status: 500 });
  }
}

export const revalidate = 600;