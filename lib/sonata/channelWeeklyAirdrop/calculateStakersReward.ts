import getStakerScores from './getStakerScores';

export default async function calculateStakersReward(channelId: string, totalAmount: number) {
  const results = await getStakerScores(channelId);

  const totalScore = results.reduce((sum, user) => sum + user.score, 0);

  const rewards = results.map((user) => {
    const amount = Math.ceil((user.score / totalScore) * totalAmount);
    return { fid: user.fid, amount };
  });

  return rewards;
}
