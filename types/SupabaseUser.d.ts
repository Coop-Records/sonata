import { Address } from 'viem';

export type SupabaseUser = {
  fid: number;
  username: string;
  pfp_url: string;
  display_name: string;
  profile: { bio: { text: string } };
  verifications: Address[];
  follower_count: number;
  power_badge: boolean;
};
