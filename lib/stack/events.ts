export const eventTipChannel = (id: string) => `channel_tip_${id}` as const;
export const eventTipCashback = (fid: number) => `tip_cashback_${fid}` as const;
export const eventTipRecipient = (fid: number) => `tip_recipient_${fid}` as const;

export const eventStakeChannel = (id: string) => `channel_stake_${id}`;
export const eventStakeChannelFid = (id: string, fid: number) => `channel_stake_${id}_${fid}` as const;

export const eventTrendingReward = (address: string) => `trending_reward_${address}` as const;

export const eventAirdrop = () => 'airdrop' as const;
export const eventAirdropChannel = (id: string) => `weekly_channel_airdrop_${id}` as const;
export const eventAirdropStaker = (id: string, fid: number) => `weekly_channel_airdrop_${id}_${fid}` as const;