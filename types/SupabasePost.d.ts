import { Address } from 'viem';
import { SupabaseUser } from './SupabaseUser';

export type SupabasePost = {
  post_hash: Address;
  likes?: number;
  author: SupabaseUser;
  authorFid: number;
  created_at: Date;
  embeds: string[];
  alternativeEmbeds: string[];
  points?: number;
  parent_url?: string;
  channelId?: string;
  hypersub_subscribed_since?: Date;
  id: number;
};
