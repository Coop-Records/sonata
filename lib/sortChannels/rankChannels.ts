import { ChannelStats } from '@/types/ChannelStats';

function rankItems(data: ChannelStats[], weightedScores: number[]) {
  return weightedScores
    .map((score, index) => ({ index, score }))
    .sort((a, b) => b.score - a.score)
    .map(({ index }) => data[index]);
}
export default rankItems;
