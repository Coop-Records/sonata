import { Address } from 'viem';
import getZoraProfile from '../getZoraProfile';
import getCompletenessScore from './getCompletenessScore';
import getFollowersScore from './getFollowersScore';
import getFollowingScore from './getFollowingScore';

async function getZoraProfileScore(address: Address) {
  const profile = await getZoraProfile(address);
  const completenessScore = getCompletenessScore(profile);
  const followersScore = getFollowersScore(profile.totalFollowers);
  const followingScore = getFollowingScore(profile.totalFollowing);
  return {
    username: profile.username || profile.handle || profile.ensName || address,
    completeness: completenessScore,
    followers: followersScore,
    following: followingScore,
  };
}

export default getZoraProfileScore;
