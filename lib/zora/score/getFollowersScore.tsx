function getFollowersScore(followers: number): number {
  // Assuming 10,000 followers is a perfect score
  const maxFollowers = 10000;
  return Math.min(Math.round((followers / maxFollowers) * 100), 100);
}

export default getFollowersScore;
