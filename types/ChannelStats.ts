export type ChannelAccumulator = Record<string, {
  uniqueAuthors: Set<number>;
  uniquePosts: Set<string>;
}>;

export interface ChannelStats {
  channelId: string;
  numberOfCurators: number;
  numberOfSongs: number;
  numberOfNotes?: number;
  balance: number;
  staked: number;
  addresses: string[]
};

export interface RankCriterion {
  name: keyof Omit<ChannelStats, 'channelId' | 'addresses'>;
  weight: number;
}