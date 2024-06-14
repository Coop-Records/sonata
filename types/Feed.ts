type FeedFilterField = 'platform' | 'channel';

export type FeedFilter = {
  [key in FeedFilterField]?: string;
};

export type FeedAvailableFilter = {
  name: string;
  key: FeedFilterField;
  options: { label: string; value: string }[];
};

export enum FeedType {
  Trending = 'Trending',
  Recent = 'Recent',
  Following = 'Following',
  Posts = 'Posts',
}
