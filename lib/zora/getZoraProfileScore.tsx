import { Address } from 'viem';
import getZoraProfile from './getZoraProfile';

async function getZoraProfileScore(address: Address) {
  const profile = await getZoraProfile(address);
  const completenessScore = calculateCompletenessScore(profile);
  const followersScore = calculateFollowersScore(profile.totalFollowers);
  const followingScore = calculateFollowingScore(profile.totalFollowing);
  return {
    username: profile.username || profile.handle || profile.ensName || address,
    completeness: completenessScore,
    followers: followersScore,
    following: followingScore,
  };
}

function calculateCompletenessScore(profile: any): number {
  let score = 0;
  const totalFields = 7;

  if (profile.avatar) score += 1;
  if (profile.displayName) score += 1;
  if (profile.description) score += 1;
  if (profile.extension?.links?.twitter) score += 1;
  if (profile.extension?.links?.instagram) score += 1;
  if (profile.extension?.links?.website) score += 1;
  if (profile.ensName) score += 1;

  return Math.round((score / totalFields) * 100);
}

function calculateFollowersScore(followers: number): number {
  // Assuming 10,000 followers is a perfect score
  const maxFollowers = 10000;
  return Math.min(Math.round((followers / maxFollowers) * 100), 100);
}

function calculateFollowingScore(following: number): number {
  // Assuming 500 following is a perfect score
  const maxFollowing = 500;
  return Math.min(Math.round((following / maxFollowing) * 100), 100);
}

export default getZoraProfileScore;
