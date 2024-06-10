import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { DEFAULT_FRAME, DESCRIPTION, TITLE } from '@/lib/consts';
import Feeds from './feeds';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };
const url = window.location.origin;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: `${url}/images/og.png`,
  },
  icons: [`${url}/images/logo2.png`],
  other: {
    ...frameMetadata,
  },
};

export default function FeedsHome() {
  return <Feeds />;
}
