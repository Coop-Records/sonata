import getBulkUsersByFid from "@/lib/neynar/getBulkUsersByFid";
import { eventAirdropChannelFid } from "@/lib/stack/events";
import { Staker } from "@/types/Stake";
import calculateStakersReward from "./calculateStakersReward";
import { stack } from "@/lib/stack/client";
import supabase from "@/lib/supabase/serverClient";

async function processStakersReward(amount: number, channelId: string) {
  const { error, data } = await supabase
    .rpc('get_users_channel_stake_and_week_date', { channel_id: channelId })
    .select<'*', Staker>('*');
  if (error) throw error;

  const users = await getBulkUsersByFid(data.map(({ fid }) => fid));
  const rewards = calculateStakersReward(data, amount);

  const processUserRewards = rewards.map(({ reward, fid }) => {
    const account = users.find(user => user.fid == fid)!.verifications[0];
    return stack.track(eventAirdropChannelFid(channelId, fid), { account, points: reward });
  });
  const results = await Promise.all(processUserRewards);

  if (results.some(result => !result.success))
    throw Error(`${channelId} processStakersReward failed`);

  return { success: true, stakersCount: data.length };
}

export default processStakersReward;