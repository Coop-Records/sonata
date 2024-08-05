const getFollowers = async (fid: number) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
    next: {
      revalidate: 60,
    },
  } as any;

  try {
    const queryParams = new URLSearchParams({ fid: String(fid), limit: '3' });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/followers?${queryParams}`,
      options,
    );
    const data = await response.json();
    const followers = data?.users?.map((follower: any) => follower.user) ?? [];

    return followers;
  } catch (error) {
    console.error('Error fetching followers', error);
    return [];
  }
};

export default getFollowers;
