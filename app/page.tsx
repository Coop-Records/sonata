import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';
import { DEFAULT_FRAME, VERCEL_URL } from '@/lib/consts';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

export const metadata: Metadata = {
  title: 'viem snapshot',
  description: 'viem snapshot',
  openGraph: {
    title: 'viem snapshot',
    description: 'viem snapshot',
    images: [`https://${VERCEL_URL}/api/og`],
  },
  other: {
    ...frameMetadata,
  },
};

const Page = () => (
  <>
    <meta property="of:accepts:xmtp" content="2024-02-01" />
    <LandingPage />
  </>
);

export default Page;
