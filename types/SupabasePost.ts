import { Address } from 'viem';

export type SupabasePost = {
  post_hash: Address;
  likes?: number;
  author: any;
  created_at: Date;
  embeds: string[];
  points?: number;
  degen?: number;
  parent_url?: string;
  channelId?: string;
};
