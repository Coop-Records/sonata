import { FeedType } from '@/types/Feed';
import { FrameMetadataType } from '@coinbase/onchainkit';
import { zeroAddress } from 'viem';
export const TITLE = 'Sonata';
export const DESCRIPTION = 'Discover music on Farcaster';
export const FARCASTER_ID_REGISTRY = '0x00000000fc6c5f01fc30151999387bb99a9f489b';
export const VERCEL_URL = process.env.NEXT_PUBLIC_FRAME_URL || 'http://localhost:3000';
export const DEFAULT_FRAME = {
  image: {
    src: `https://framerusercontent.com/images/UjSwC7tz1DFYsxiMeKvEI6K7eo.png`,
  },
  postUrl: `${VERCEL_URL}/api/frame`,
} as FrameMetadataType;
export const FRAME_INPUT_PLACEHOLDER = '0x... or .eth';

export const SOUND_FACTORY = '0x0000000000aec84F5BFc2af15EAfb943bf4e3522';
export const REFERRAL = process.env.NEXT_PUBLIC_REFERRAL || zeroAddress;
export const AIRSTACK_API_URL = 'https://api.airstack.xyz/graphql';
export const tabs = [
  { label: 'Trending', href: '/', value: FeedType.Trending },
  { label: 'Recent', href: '/recent', value: FeedType.Recent },
  { label: 'Following', href: '/following', value: FeedType.Following },
];

export const fetchPostsLimit = 20;
