import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { DEFAULT_FRAME, DESCRIPTION, TITLE, VERCEL_URL } from '@/lib/consts';
import TrendingPage from '@/components/TrendingPage/TrendingPage';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [`https://${VERCEL_URL}/api/og`],
  },
  other: {
    ...frameMetadata,
  },
};

const Trending = () => <TrendingPage />;

export default Trending;
