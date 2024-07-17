import { ChannelStats, RankCriterion } from "@/types/ChannelStats";

function calculateWeightedScores(
  normalizedData: ChannelStats[],
  criteria: RankCriterion[]
) {
  return normalizedData.map(item => {
    let score = 0;
    criteria.forEach(criterion => {
      score += (item[criterion.name] ?? 0) * criterion.weight;
    });
    return score;
  });
}

export default calculateWeightedScores;