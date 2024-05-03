import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { DEFAULT_FRAME, DESCRIPTION, TITLE, VERCEL_URL } from '@/lib/consts';
import getCombinedFeeds from '@/lib/neynar/getCombinedFeeds';
import Feed from '@/components/Feed';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [`https://framerusercontent.com/images/UjSwC7tz1DFYsxiMeKvEI6K7eo.png`],
  },
  icons: [`${VERCEL_URL}/images/logo2.png`],
  other: {
    ...frameMetadata,
  },
};

export default async function Trending() {
  const feed = await getCombinedFeeds();

  feed.sort((cast1: any, cast2: any) => {
    return cast2.reactions.likes.length - cast1.reactions.likes.length;
  });

  return feed?.length > 0 && <Feed feed={feed} />;
}
