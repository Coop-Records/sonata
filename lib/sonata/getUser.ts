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
    return users[0];
  } catch (error) {
    console.error(error);
    return { error };
  }
}
