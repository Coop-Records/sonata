import { ChannelStats, RankCriterion } from "@/types/ChannelStats";

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
export default normalizeData;