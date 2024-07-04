export default async function getUsers(fids: number[]) {
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
    return users;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
