import getVerifications from '@/lib/farcaster/getVerifications';
import calculateStakersReward from './calculateStakersReward';

import { AirdropChannel } from '@/types/AirdropChannel';
import { EventPayloadWithEvent } from '@stackso/js-core';
import { eventAirdropStaker } from '@/lib/stack/events';

async function getStakerAirdropEvents({ channelId, stakersAirdropAmount }: AirdropChannel) {
  const rewards = await calculateStakersReward(channelId, stakersAirdropAmount);
  const stakerAirdropEvents: EventPayloadWithEvent[] = await Promise.all(
    rewards.map(async ({ fid, amount }) => {
      const verifications = await getVerifications(fid);
      const account = verifications[0];
      return { event: eventAirdropStaker(channelId, fid), payload: { account, points: amount } };
    }),
  );
  return stakerAirdropEvents;
}

export default getStakerAirdropEvents;
