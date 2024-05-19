const getFollowing = async (fid: number = 2) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
  };
  const following = await fetch(`/api/getFollowing?fid=${fid}`, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));

  return following;
};

export default getFollowing;
