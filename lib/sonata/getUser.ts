export default async function getUser(fids: number | number[]) {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      fids: fids as any,
    });

    const response = await fetch(`/api/neynar/getUser?${queryParams}`, options);
    const { users } = await response.json();
    return typeof fids === 'number' ? users[0] : users;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
