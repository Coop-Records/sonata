import { FOLLOWERS_PERFECT } from '@/lib/consts';

function getFollowingScore(following: number): number {
  const perfectFollowing = FOLLOWERS_PERFECT / 5;
  return Math.min(Math.round((following / perfectFollowing) * 100), 100);
}

export default getFollowingScore;
