import { CastResponse } from "@/types/Cast";

async function getCastLikesCount(hash: string) {
  const queryParams = new URLSearchParams({
    identifier: hash,
    type: 'hash',
  });

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  const castResponse = await fetch(
    `https://api.neynar.com/v2/farcaster/cast?${queryParams}`,
    options,
  );
  const data: CastResponse = await castResponse.json();

  return data.cast.reactions.likes_count;
}

export default getCastLikesCount;
