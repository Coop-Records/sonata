import { Cast as CastType } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Address } from 'viem';

export type Cast = CastType & {
  hash: Address;
  reactions: {
    likes: {
      fid: string;
    }[];
  };
};
