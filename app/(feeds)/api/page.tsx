import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { DEFAULT_FRAME, DESCRIPTION, TITLE, VERCEL_URL } from '@/lib/consts';

import ApiCard from '@/components/ApiCard/ApiCard';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: `${VERCEL_URL}/images/og.png`,
  },
  icons: [`${VERCEL_URL}/images/logo2.png`],
  other: {
    ...frameMetadata,
  },
};

export default function ApiHome() {
  const feedEndpoints = [
    {
      title: 'Introduction',
      endpoints: [
        {
          url: 'Brief overview of the API and its purpose.',
        },
      ],
    },
    {
      title: 'Feed',
      endpoints: [
        {
          method: 'GET',
          url: '/api/feed/',
          queryParams: '',
        },
      ],
    },
  ];

  return (
    <>
      {feedEndpoints.map((api, index) => (
        <ApiCard key={index} title={api.title} endpoints={api.endpoints} />
      ))}
    </>
  );
}
