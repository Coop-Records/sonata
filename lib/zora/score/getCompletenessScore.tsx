function getCompletenessScore(profile: any): number {
  if (!profile) return 0;
  let score = 0;
  const totalFields = 8;

  if (profile.avatar) score += 1;
  if (profile.displayName) score += 1;
  if (profile.description) score += 1;
  if (profile.extension?.links?.twitter) score += 1;
  if (profile.extension?.links?.instagram) score += 1;
  if (profile.extension?.links?.farcaster) score += 1;
  if (profile.extension?.links?.website) score += 1;
  if (profile.ensName) score += 1;

  return Math.round((score / totalFields) * 100);
}

export default getCompletenessScore;
