function getZoraScore(profile: {
  completeness: number;
  followers: number;
  following: number;
}): number {
  const { completeness, followers, following } = profile;
  return (completeness + followers + following) / 3;
}

export default getZoraScore;
