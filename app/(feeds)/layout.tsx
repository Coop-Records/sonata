'use client';

import { ReactNode } from 'react';
import CreatePostButton from '@/components/CreatePostButton';
import FeedProvider from '@/providers/FeedProvider';
import { useParams } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';

export default function FeedLayout({ children }: { children: ReactNode }) {
  const { username, channelId } = useParams();
  const { user } = usePrivy();

  return (
    <FeedProvider>
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      {children}
      {user?.farcaster && !username && !channelId && <CreatePostButton />}
    </FeedProvider>
  );
}
