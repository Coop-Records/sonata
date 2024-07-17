export type ChannelAccumulator = Record<string, {
  uniqueAuthors: Set<number>;
  uniquePosts: Set<string>;
  notes?: number;
}>;

export interface ChannelStats {
  channelId: string;
  numberOfCurators: number;
  numberOfSongs: number;
  numberOfNotes?: number
};

export interface RankCriterion {
  name: keyof Omit<ChannelStats, 'channelId'>;
  weight: number;
}