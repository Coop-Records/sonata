import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export type SupabaseUser = User & { power_badge: boolean };
