'use server';

import { ReactionsResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";

async function hasUserLikedCast(hash: string, fid: number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      api_key: process.env.NEYNAR_API_KEY!
    },
  } as any;

  const queryParams = new URLSearchParams({
    hash,
    types: 'likes',
    limit: '100',
  });

  let cursor: string | undefined;

  do {
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/reactions/cast?${queryParams}`,
      options,
    );
    const data: {
      cursor?: string;
    } & ReactionsResponse = await response.json();

    for (const { user } of data.reactions) {
      if (user.fid === fid) return true;
    }

    cursor = data.cursor;
    queryParams.set('cursor', String(cursor));
  } while (cursor);

  return false;
}

export default hasUserLikedCast;
