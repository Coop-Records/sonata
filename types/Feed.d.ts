type FeedFilterField = 'platform' | 'channel';

export type FeedFilter = {
  [key in FeedFilterField]?: string;
};

export type FeedAvailableFilter = {
  name: string;
  key: FeedFilterField;
  options: { label: string; value: string }[];
};
