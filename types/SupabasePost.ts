import { Address } from 'viem';

export type SupabasePost = {
  post_hash: Address;
  likes: number;
  author: any;
  created_at: string
};
