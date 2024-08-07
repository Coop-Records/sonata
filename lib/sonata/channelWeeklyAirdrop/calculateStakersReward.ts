import { Staker } from "@/types/Stake";

export default function calculateStakersReward(users: Staker[], totalAmount: number) {
  const currentDate = new Date();

  const userScores = users.map(user => {
    let investedDays = 8;

    if (user.earliest_week_stake) {
      console.log('earliest_week_stake', user.earliest_week_stake);
      const stakedDate = new Date(user.earliest_week_stake);
      investedDays = Math.floor((currentDate.getTime() - stakedDate.getTime()) / (1000 * 3600 * 24));
    }
    const days = Math.min(investedDays, 8);
    const score = user.amount * (days + 1);

    return { fid: user.fid, score };
  });

  const totalScore = userScores.reduce((sum, user) => sum + user.score, 0);

  const rewards = userScores.map(user => {
    const reward = (user.score / totalScore) * totalAmount;
    return { fid: user.fid, reward: Math.ceil(reward) };
  });

  return rewards;
}