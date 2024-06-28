import getCastHash from "./neynar/getCastHash";

export async function getFullHash(username: string, hash: string) {
  return await getCastHash(`https://warpcast.com/${username}/${hash}`);
}
