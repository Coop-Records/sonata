import {
  EVENT_ZORA_REWARDS_CREATE_REFERRAL,
  EVENT_ZORA_REWARDS_CREATOR,
  EVENT_ZORA_REWARDS_FIRST_MINTER,
  EVENT_ZORA_REWARDS_MINT_REFERRAL,
} from '@/lib/consts';
import { rewardStack } from '@/lib/stack/client';
import { Address } from 'viem';

const getRewardsPoints = async (address: Address) => {
  const [
    creatorRewards,
    createReferralRewards,
    mintReferralRewards,
    firstMinterRewards,
    totalRewards,
    events,
  ] = await Promise.all([
    rewardStack.getPoints(address, { event: EVENT_ZORA_REWARDS_CREATOR }),
    rewardStack.getPoints(address, { event: EVENT_ZORA_REWARDS_CREATE_REFERRAL }),
    rewardStack.getPoints(address, { event: EVENT_ZORA_REWARDS_MINT_REFERRAL }),
    rewardStack.getPoints(address, { event: EVENT_ZORA_REWARDS_FIRST_MINTER }),
    rewardStack.getPoints(address),
    rewardStack.getEvents({
      address,
    }),
  ]);

  return {
    creatorRewards,
    createReferralRewards,
    mintReferralRewards,
    firstMinterRewards,
    totalRewards,
    events,
  };
};

export default getRewardsPoints;
