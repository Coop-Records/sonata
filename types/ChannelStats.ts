export type ChannelAccumulator = Record<string, {
  uniqueAuthors: Set<number>;
  uniquePosts: Set<string>;
}>;

export interface ChannelStats {
  channelId: string;
  numberOfCurators: number;
  numberOfSongs: number;
  totalNotes: number;
  balance: number;
  staked: number;
  stakers: number;
  addresses: string[]
};

export interface RankCriterion {
  name: keyof Omit<ChannelStats, 'channelId' | 'addresses'>;
  weight: number;
}