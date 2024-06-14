export default async function getUserByUsername(username: string) {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  const queryParams = new URLSearchParams({
    username,
  });

  const response = await fetch(
    `https://api.neynar.com/v1/farcaster/user-by-username?${queryParams}`,
    options,
  );
  const { result } = await response.json();
  return result.user;
}
