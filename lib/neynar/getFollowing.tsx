const getFollowing = async (fid: number = 2) => {
  const following = await fetch(`/api/neynar/getFollowing?fid=${fid}`).then((response) =>
    response.json(),
  );

  if (following.error) {
    return { users: [] };
  }

  return following;
};

export default getFollowing;
