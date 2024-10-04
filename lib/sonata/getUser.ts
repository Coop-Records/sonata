import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export default async function getUser(fid: number) {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      fids: String(fid),
    });

    const response = await fetch(`/api/neynar/getUser?${queryParams}`, options);
    const { users } = await response.json();
    return users[0] as User;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
