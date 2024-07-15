import { ChannelStats, RankCriterion } from "@/types/ChannelStats";

function sortChannels(channelStats: ChannelStats[]) {
  const criteria: RankCriterion[] = [
    { name: 'numberOfNotes', weight: .6 },
    { name: 'numberOfSongs', weight: .2 },
    { name: 'numberOfCurators', weight: .2 },
  ];

  const normalizedData = normalizeData(channelStats, criteria);
  const weightedScores = calculateWeightedScores(normalizedData, criteria);
  const rankedItems = rankItems(channelStats, weightedScores);

  return rankedItems;
}

function normalizeData(data: ChannelStats[], criteria: RankCriterion[]) {
  const criteriaMinMax = criteria.map(criterion => ({
    name: criterion.name,
    min: Math.min(...data.map(d => d[criterion.name] ?? 0)),
    max: Math.max(...data.map(d => d[criterion.name] ?? 0)),
  }));

  return data.map(item => {
    const normalizedItem = { ...item };

    criteriaMinMax.forEach(({ name, min, max }) => {
      normalizedItem[name] = ((item[name] ?? 0) - min) / (max - min)
    });

    return normalizedItem;
  });
}

function calculateWeightedScores(
  normalizedData: ChannelStats[],
  criteria: RankCriterion[]
) {
  return normalizedData.map(item => {
    let score = 0;
    criteria.forEach(criterion => {
      score += (item[criterion.name] ?? 0) * criterion.weight;
    });
    console.log(item.channelId, 'score', score);
    return score;
  });
}

function rankItems(data: ChannelStats[], weightedScores: number[]) {
  return weightedScores.map((score, index) => ({ index, score }))
    .sort((a, b) => b.score - a.score)
    .map(({ index }) => data[index]);
}

export default sortChannels;
