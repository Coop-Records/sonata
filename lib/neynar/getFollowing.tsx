const getFollowing = async (fid: number) => {
  let first = true,
    cursor = null;

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
    next: {
      revalidate: 60,
    },
  } as any;

  try {
    const params: any = { fid, limit: '100' };
    const following = [];
    while (first || cursor) {
      first = false;
      if (cursor) {
        params.cursor = cursor;
      }
      const queryParams = new URLSearchParams(params);

      const response = await fetch(
        `https://api.neynar.com/v2/farcaster/following?${queryParams}`,
        options,
      );
      const data = await response.json();
      if (data.users) {
        following.push(...data.users.map((user: any) => user.user));
      }
      cursor = data.next.cursor;
    }

    return following;
  } catch (error) {
    console.error('Error fetching following', error);
    return [];
  }
};

export default getFollowing;
