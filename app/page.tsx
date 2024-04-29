import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { DEFAULT_FRAME, DESCRIPTION, TITLE, VERCEL_URL } from '@/lib/consts';
import Feed from '@/components/Feed';
import getCombinedFeeds from '@/lib/neynar/getCombinedFeeds';

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

export default async function Trending() {
  const feed = await getCombinedFeeds();

  feed.sort((cast1: any, cast2: any) => {
    return cast2.reactions.likes.length - cast1.reactions.likes.length;
  });

  return (
    <main>
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <div className="container flex justify-center py-12 font-helvetica bg-blend-color-burn">
        {feed?.length > 0 && <Feed feed={feed} />}
      </div>
    </main>
  );
}
