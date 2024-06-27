import { Cast as CastType, CastWithInteractionsReactions } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Address } from 'viem';

export type Cast = CastType & {
  hash: Address;
  reactions: {
    likes: {
      fid: string;
    }[];
  };
  points: number;
  degen: number;
};

export interface CastResponse {
  cast: {
    reactions: {
      likes_count: number;
    } & CastWithInteractionsReactions;
  };
};