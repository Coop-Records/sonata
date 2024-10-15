import { Address } from 'viem';
import getZoraProfile from '../getZoraProfile';
import getCompletenessScore from './getCompletenessScore';
import getFollowersScore from './getFollowersScore';
import getFollowingScore from './getFollowingScore';

async function getZoraProfileScore(address: Address) {
  const profile = await getZoraProfile(address);
  if (!profile) {
    return {
      username: '',
      completeness: 0,
      followers: 0,
      following: 0,
    };
  }

  const completenessScore = getCompletenessScore(profile);
  const followersScore = getFollowersScore(profile.totalFollowers);
  const followingScore = getFollowingScore(profile.totalFollowing);
  const profileComponentScore = (completenessScore + followersScore + followingScore) / 3;
  return {
    username: profile.username || profile.handle || profile.ensName || address,
    completeness: completenessScore,
    followers: followersScore,
    following: followingScore,
    score: profileComponentScore,
  };
}

export default getZoraProfileScore;
