import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get('fid') || '2';
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
  };
  const finalResponse = await fetch(
    `https://api.pinata.cloud/v3/farcaster/users?fid=${fid}&following=true&pageSize=1000`,
    options,
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));

  return new Response(JSON.stringify({ users: finalResponse.data.users }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
