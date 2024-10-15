import { MAX_CREATE_SCORE } from '@/lib/consts';

export function getCreateScore(tokensCreated: number) {
  const maxCreateScore = MAX_CREATE_SCORE;
  const score = Math.min(tokensCreated / maxCreateScore, 1);
  return score * 100;
}
