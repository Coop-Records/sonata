function getFollowingScore(following: number): number {
  // Assuming 500 following is a perfect score
  const maxFollowing = 500;
  return Math.min(Math.round((following / maxFollowing) * 100), 100);
}

export default getFollowingScore;
