import {
  CHAIN_ID,
  EVENT_ZORA_REWARDS_CREATE_REFERRAL,
  EVENT_ZORA_REWARDS_CREATOR,
  EVENT_ZORA_REWARDS_FIRST_MINTER,
  EVENT_ZORA_REWARDS_MINT_REFERRAL,
} from '@/lib/consts';
import weiToSparks from '@/lib/zora/toSparks';

const logsToStack = (logs: any[]) => {
  const trackingEvents = logs.map((log: any) => [
    {
      name: EVENT_ZORA_REWARDS_CREATOR,
      account: log.args.creator,
      pointSystemId: process.env.REWARDS_DEPOSIT_POINT_SYSTEM_ID!,
      points: weiToSparks(log.args.creatorReward),
      metadata: { ...log.args, blockNumber: log.blockNumber },
      uniqueId: `${CHAIN_ID}-${log.transactionHash}-${EVENT_ZORA_REWARDS_CREATOR}`,
    },
    {
      name: EVENT_ZORA_REWARDS_CREATE_REFERRAL,
      account: log.args.createReferral,
      pointSystemId: process.env.REWARDS_DEPOSIT_POINT_SYSTEM_ID!,
      points: weiToSparks(log.args.createReferralReward),
      metadata: { ...log.args, blockNumber: log.blockNumber },
      uniqueId: `${CHAIN_ID}-${log.transactionHash}-${EVENT_ZORA_REWARDS_CREATE_REFERRAL}`,
    },
    {
      name: EVENT_ZORA_REWARDS_MINT_REFERRAL,
      account: log.args.mintReferral,
      pointSystemId: process.env.REWARDS_DEPOSIT_POINT_SYSTEM_ID!,
      points: weiToSparks(log.args.mintReferralReward),
      metadata: { ...log.args, blockNumber: log.blockNumber },
      uniqueId: `${CHAIN_ID}-${log.transactionHash}-${EVENT_ZORA_REWARDS_MINT_REFERRAL}`,
    },
    {
      name: EVENT_ZORA_REWARDS_FIRST_MINTER,
      account: log.args.firstMinter,
      pointSystemId: process.env.REWARDS_DEPOSIT_POINT_SYSTEM_ID!,
      points: weiToSparks(log.args.firstMinterReward),
      metadata: { ...log.args, blockNumber: log.blockNumber },
      uniqueId: `${CHAIN_ID}-${log.transactionHash}-${EVENT_ZORA_REWARDS_FIRST_MINTER}`,
    },
  ]);

  const flatTrackingEvents = trackingEvents.flat();
  flatTrackingEvents.sort((a, b) => {
    if (a.metadata.blockNumber > b.metadata.blockNumber) return -1;
    if (a.metadata.blockNumber < b.metadata.blockNumber) return 1;
    return 0;
  });
  return flatTrackingEvents;
};

export default logsToStack;
