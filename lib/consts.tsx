import { FeedType } from '@/types/Feed';
import { SupabasePost } from '@/types/SupabasePost';
import { FrameMetadataType } from '@coinbase/onchainkit';
import { Address, zeroAddress } from 'viem';
import { base, baseSepolia } from 'viem/chains';

export const REFFERAL_ADDRESS = '0x07089a002832CF8EAcE9f381651D6155dEB4DE0d';
export const FEE = 0.1;
export const TITLE = 'Sonata';
export const DESCRIPTION = 'Discover music on Farcaster';
export const FARCASTER_ID_REGISTRY = '0x00000000fc6c5f01fc30151999387bb99a9f489b';
export const VERCEL_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';
export const DEFAULT_FRAME = {
  image: {
    src: `https://framerusercontent.com/images/UjSwC7tz1DFYsxiMeKvEI6K7eo.png`,
  },
  postUrl: `${VERCEL_URL}/api/frame`,
} as FrameMetadataType;
export const FRAME_INPUT_PLACEHOLDER = '0x... or .eth';

export const LOGO_URL = `${VERCEL_URL}/images/notes.png`;

export const SOUND_FACTORY = '0x0000000000aec84F5BFc2af15EAfb943bf4e3522';
export const REFERRAL = process.env.NEXT_PUBLIC_REFERRAL || zeroAddress;
export const AIRSTACK_API_URL = 'https://api.airstack.xyz/graphql';
export const tabs = [
  { label: 'Following', href: '/following', value: FeedType.Following },
  { label: 'Trending', href: '/', value: FeedType.Trending },
  { label: 'Recent', href: '/recent', value: FeedType.Recent },
  { label: 'Posts', href: '#', value: FeedType.Posts },
  { label: 'Stakes', href: '#', value: 'stakes' },
];

export const CHANNELS = [
  {
    label: '/sonata',
    value: 'sonata',
    icon: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4e85acaa-4f1d-444b-1e35-dd06d43d0800/rectcrop3',
  },
  {
    label: '/music',
    value: 'music',
    icon: 'https://i.imgur.com/Mjyb3Y8.png',
    parentUrl: 'chain://eip155:7777777/erc721:0xe96c21b136a477a6a97332694f0caae9fbb05634',
  },
  { label: '/louder', value: 'louder', icon: 'https://i.imgur.com/r4GIRLL.png' },
  { label: '/rock', value: 'rock', icon: 'https://i.imgur.com/Ffj1Opg.png' },
  { label: '/techno', value: 'techno', icon: 'https://i.imgur.com/omLkrpT.png' },
  { label: '/albumoftheday', value: 'albumoftheday', icon: 'https://i.imgur.com/RZQbasU.gif' },
  { label: '/soundscapes', value: 'soundscapes', icon: 'https://i.imgur.com/TUtJ82Q.jpg' },
  { label: '/djs', value: 'djs', icon: 'https://i.imgur.com/EQ7kMoE.jpg' },
  { label: '/soundxyz', value: 'soundxyz', icon: 'https://i.imgur.com/BbvrNR2.jpg' },
  { label: '/bangers', value: 'bangers', icon: 'https://i.imgur.com/URBvewb.png' },
  { label: '/spotify', value: 'spotify', icon: 'https://i.imgur.com/3Z8YjMT.jpg' },
  { label: '/coop-recs', value: 'coop-recs', icon: 'https://i.imgur.com/eecb7AP.gif' },
  { label: '/housemusic', value: 'housemusic', icon: 'https://i.imgur.com/rt1dcOI.jpg' },
  {
    label: '/classical',
    value: 'classical',
    icon: 'https://i.imgur.com/7ng6bHS.png',
    parentUrl: 'https://en.wikipedia.org/wiki/Johann_Sebastian_Bach',
  },
  {
    label: '/rap',
    value: 'rap',
    icon: 'https://i.imgur.com/2wrkiVY.png',
  },
  {
    label: '/latinmusic',
    value: 'latinmusic',
    icon: 'https://i.imgur.com/SJPfK0B.jpg',
  },
  {
    label: '/electronic',
    value: 'electronic',
    icon: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/802dff8d-78d2-47cb-9a78-c4fc3accac00/rectcrop3',
    parentUrl: 'chain://eip155:1/erc721:0x05acde54e82e7e38ec12c5b5b4b1fd1c8d32658d',
  },
  {
    label: '/musicaW3',
    value: 'musicaw3',
    icon: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/691b5ce9-7811-4308-5fab-d647adfe1200/original',
    parentUrl: 'https://warpcast.com/~/channel/musicaw3',
  },
  {
    label: '/japanese-music',
    value: 'japanese-music',
    icon: 'https://i.imgur.com/kF2MbEf.jpg',
    parentUrl: 'https://warpcast.com/~/channel/japanese-music',
  },
  {
    label: '/speedymusic',
    value: 'speedymusic',
    icon: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/736727ec-69cd-450e-0bf1-d01ab51c7600/original',
    parentUrl: 'https://warpcast.com/~/channel/speedymusic',
  },
  {
    label: '/videogamemusic',
    value: 'videogamemusic',
    icon: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/4ff7ab8e-3679-4f40-f190-9cdd2541eb00/original',
    parentUrl: 'https://warpcast.com/~/channel/videogamemusic',
  },
];

export const fetchPostsLimit = 20;

export const CONTENT_PLATFORMS = [
  { url: 'spotify.com/track', title: 'spotify' },
  { url: 'spotify.com/intl-es/track', title: 'spotify' },
  { url: 'soundcloud.com', title: 'soundcloud' },
  { url: 'sound.xyz', title: 'soundxyz' },
  { url: 'youtube.com/watch', title: 'youtube' },
  { url: 'youtu.be', title: 'youtube' },
  { url: 'zora.co/collect', title: 'zora' },
] as const;

export const PLATFORM_ICONS: Record<string, string> = {
  spotify: '/images/spotify.png',
  youtube: '/images/youtube.svg',
  soundcloud: '/images/soundcloud.png',
};

export const ZORA_TO_VIEM = {
  arb: 'arbitrum',
  base: 'base',
  blast: 'blast',
  eth: 'mainnet',
  oeth: 'optimism',
  pgn: 'pgn',
  zora: 'zora',
} as const;

export type ZoraChains = keyof typeof ZORA_TO_VIEM;

// SONG MARKETS
export const IS_TEST = process.env.NEXT_PUBLIC_TEST === 'true';
export const CHAIN = IS_TEST ? baseSepolia : base;
export const SONG_MARKET_CONTRACT = '0xc05c4d631a8e0fdaa2d2cea1dba3727351eeb73e' as Address;
export const MINIMUM_NOTES_FOR_SONG_MARKET = 1111;
export const SONG_MARKET_POINT_SYSTEM_ID = 3285;
export const MARKET_COUNTDOWN = IS_TEST ? 1n : BigInt(24 * 60 * 60);
export const MIN_MINTS_FOR_SONG_MARKET = IS_TEST ? 2n : 11111n;
export const ZORA_MINT_FEE = 11100000000000n;

export const FEEDS_MOCK = [
  {
    id: 1210529,
    post_hash: '0x0a5c26f50e719fb76402523c4d6ae0637a5b72b5',
    points: 1500,
    version: 1,
    degen: 10,
    likes: 6,
    author: {
      fid: 210648,
      object: 'user',
      pfp_url: 'https://i.imgur.com/KX2nQMz.png',
      profile: {
        bio: {
          text: 'the dev for onchain music',
        },
      },
      username: 'sweetman.eth',
      power_badge: true,
      display_name: 'sweetman',
      active_status: 'inactive',
      verifications: [
        '0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38',
        '0x0b04b2abe7844895cf79bee2734932ff18ee28e8',
        '0xb5acded340d66678f01097818940a0f028dafb8d',
      ],
      follower_count: 1229,
      custody_address: '0xc0839ddde7ad70bc49fd20fc5800c0fb1b2c4d9c',
      following_count: 130,
      verified_addresses: {
        eth_addresses: [
          '0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38',
          '0x0b04b2abe7844895cf79bee2734932ff18ee28e8',
          '0xb5acded340d66678f01097818940a0f028dafb8d',
        ],
        sol_addresses: [],
      },
    },
    embeds: ['{"url":"https://open.spotify.com/track/7Kmfjms3yyhg2y56mN7EfZ?si=fd0eeaec65484be1"}'],
    channelId: 'music',
    alternativeEmbeds: [
      'https://music.amazon.com/albums/B07SCP7X9B?trackAsin=B07SBMRXRM',
      'https://amazon.com/dp/B07SBMRXRM',
      'https://audiomack.com/song/hector-lavoe/el-dia-de-mi-suerte',
      'https://play.anghami.com/song/1161305773?refer=linktree',
      'https://www.boomplay.com/songs/5860108',
      'https://www.deezer.com/track/1182194142',
      'https://geo.music.apple.com/us/album/_/1464270824?i=1464272393&mt=1&app=music&ls=1&at=1000lHKX&ct=api_http&itscg=30200&itsct=odsl_m',
      'https://geo.music.apple.com/us/album/_/1464270824?i=1464272393&mt=1&app=itunes&ls=1&at=1000lHKX&ct=api_http&itscg=30200&itsct=odsl_m',
      'https://play.napster.com/track/tra.790205620',
      'https://www.pandora.com/TR:5812210',
      'https://soundcloud.com/willie-colon-official/el-dia-de-mi-suerte',
      'https://listen.tidal.com/track/110215451',
      'https://music.yandex.ru/track/1181034',
      'https://www.youtube.com/watch?v=mXZRB_al3fs',
      'https://music.youtube.com/watch?v=mXZRB_al3fs',
      'https://open.spotify.com/track/7Kmfjms3yyhg2y56mN7EfZ',
    ],
    authorFid: 210648,
  },
  {
    id: 57655,
    post_hash: '0xd0f35f47bd4ac30165ac8959aeadec23a6851805',
    points: 0,
    version: 1,
    created_at: '2024-09-18T15:28:04.817+00:00',
    degen: 0,
    likes: 0,
    author: {
      fid: 210648,
      object: 'user',
      pfp_url: 'https://i.imgur.com/KX2nQMz.png',
      profile: {
        bio: {
          text: '✧the dev for onchain music\n✧✧✧✧✧✧✧',
          mentioned_profiles: [],
        },
      },
      username: 'sweetman.eth',
      power_badge: true,
      display_name: 'sweetman',
      active_status: 'inactive',
      verifications: [
        '0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38',
        '0x0b04b2abe7844895cf79bee2734932ff18ee28e8',
        '0xb5acded340d66678f01097818940a0f028dafb8d',
      ],
      follower_count: 1986,
      custody_address: '0xc0839ddde7ad70bc49fd20fc5800c0fb1b2c4d9c',
      following_count: 163,
      verified_addresses: {
        eth_addresses: [
          '0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38',
          '0x0b04b2abe7844895cf79bee2734932ff18ee28e8',
          '0xb5acded340d66678f01097818940a0f028dafb8d',
        ],
        sol_addresses: [],
      },
    },
    embeds: ['{"url":"https://open.spotify.com/track/7Kmfjms3yyhg2y56mN7EfZ"}'],
    channelId: null,
    alternativeEmbeds: null,
    authorFid: 210648,
  },
];
