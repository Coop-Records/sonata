export interface UserStake {
  channelId: string;
  description: string;
  points: number;
  icon: string;
};

export interface Staker {
  fid: number;
  amount: number;
  earliest_week_stake: string | null;
};