import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import getStakerScores from "./getStakerScores";

export default async function calculateStakersReward(
  users: User[],
  channelId: string,
  totalAmount: number
) {
  const results = await getStakerScores(users, channelId);

  const userScores = results.filter(user => user !== null) as { fid: number; score: number }[];
  const totalScore = userScores.reduce((sum, user) => sum + user.score, 0);

  const rewards = userScores.map(user => {
    const reward = (user.score / totalScore) * totalAmount;
    return { fid: user.fid, reward: Math.ceil(reward) };
  });

  return rewards;
}