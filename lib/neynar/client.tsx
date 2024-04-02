import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export const client = new NeynarAPIClient(process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string);
