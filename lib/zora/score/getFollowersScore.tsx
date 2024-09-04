import { FOLLOWERS_PERFECT } from '@/lib/consts';

function getFollowersScore(followers: number): number {
  const perfectFollowers = FOLLOWERS_PERFECT;
  return Math.min(Math.round((followers / perfectFollowers) * 100), 100);
}

export default getFollowersScore;
