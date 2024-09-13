import getBulkUsersByFid from '@/lib/neynar/getBulkUsersByFid';
import { eventAirdropStaker } from '@/lib/stack/events';
import calculateStakersReward from './calculateStakersReward';
import { stack } from '@/lib/stack/client';
import supabase from '@/lib/supabase/serverClient';

async function distributeChannelStakerWeeklyAirdropAndTips(amount: number, channelId: string) {
  const { error, data } = await supabase.rpc('get_distinct_stakers_in_channel', {
    channel_id: channelId,
  });
  if (error) throw error;

  const users = await getBulkUsersByFid(data);
  const rewards = await calculateStakersReward(users, channelId, amount);
  console.log(`channel ${channelId} stakers of ${amount}`, rewards);

  const processUserRewards = rewards.map(({ reward, fid }) => {
    const account = users.find((user) => user.fid == fid)!.verifications[0];
    return stack.track(eventAirdropStaker(channelId, fid), { account, points: reward });
  });
  const results = await Promise.all(processUserRewards);

  if (results.some((result) => !result?.success))
    throw Error(`${channelId} distributeChannelStakerWeeklyAirdropAndTips failed`);

  return { success: true, stakersCount: data.length };
}

export default distributeChannelStakerWeeklyAirdropAndTips;
