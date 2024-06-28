export function getHighestRank(validRanks: any[]) {
  return validRanks.length === 0 ? 0 : Math.min(...validRanks);
}
