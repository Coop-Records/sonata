const getFollowers = async (fid: number = 2) => {
  const followers = await fetch(`/api/neynar/getFollowers?fid=${fid}`).then((response) =>
    response.json(),
  );

  if (followers.error) {
    return { users: [] };
  }

  return followers;
};

export default getFollowers;
