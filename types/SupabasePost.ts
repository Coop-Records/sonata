import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Address } from 'viem';

export type SupabasePost = {
  post_hash: Address;
  likes?: number;
  author: User;
  created_at: Date;
  embeds: string[];
  alternativeEmbeds: string[];
  points?: number;
  degen?: number;
  parent_url?: string;
  channelId?: string;
  id:number
};
