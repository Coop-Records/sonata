export default async function getUser(fid: number) {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  const queryParams = new URLSearchParams({
    fids: String(fid),
  });

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?${queryParams}`,
    options,
  );
  const { users } = await response.json();
  return users[0];
}
