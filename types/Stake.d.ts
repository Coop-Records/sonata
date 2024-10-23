import { ApiResponse } from './ApiResponse';

export interface UserStake {
  channelId: string;
  description: string;
  points: number;
  icon: string;
}

export type ChannelStakeParams = {
  channelId: string;
  amount: number;
  accessToken: string;
};

export type ChannelStakeResponse = ApiResponse<{
  usedAmount: number;
  remainingBalance: number;
}>;

export type ChannelUnstakeResponse = ApiResponse<{
  unstakedAmount: number;
  remainingStake: number;
}>;
