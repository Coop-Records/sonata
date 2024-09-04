function getFollowersScore(followers: number): number {
  const perfectFollowers = 55555;
  return Math.min(Math.round((followers / perfectFollowers) * 100), 100);
}

export default getFollowersScore;
