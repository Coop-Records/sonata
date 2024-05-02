import { getFrameMetadata } from '@coinbase/onchainkit';
import { DEFAULT_FRAME, DESCRIPTION, TITLE, VERCEL_URL } from '@/lib/consts';

const getMetadata = () => {
  const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

  return {
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
};

export default getMetadata;
