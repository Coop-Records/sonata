import { SCORE_FACTOR } from '@/lib/consts';

interface getZoraScoreProps {
  profileScore: number;
  createScore: number;
}

function getZoraScore({ profileScore, createScore }: getZoraScoreProps): number {
  return SCORE_FACTOR * (profileScore + createScore);
}

export default getZoraScore;
