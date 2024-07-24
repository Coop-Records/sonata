import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";

async function getBulkUsersByFid(fids: number[] | string) {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  const queryParams = new URLSearchParams({
    fids: fids.toString(),
  });

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?${queryParams}`,
    options,
  );

  const { users } = await response.json();
  return users as User[];
}

export default getBulkUsersByFid;
