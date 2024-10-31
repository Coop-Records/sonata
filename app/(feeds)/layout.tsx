'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import GlobalPlayer from '@/components/GlobalPlayer';
import CreatePostButton from '@/components/CreatePostButton';
import FeedProvider from '@/providers/FeedProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import { useParams } from 'next/navigation';
import StakeProvider from '@/providers/StakeProvider';
import { cn } from '@/lib/utils';
import ChannelHeader from '@/components/Header/ChannelHeader';
import { usePrivy } from '@privy-io/react-auth';

export default function FeedLayout({ children }: { children: ReactNode }) {
  const { username, channelId } = useParams();
  const { user } = usePrivy();
  const enableMaxWidth = !channelId && !username;

  return (
    <ProfileProvider>
      <FeedProvider>
        <StakeProvider>
          <div className="flex grow">
            <meta property="of:accepts:xmtp" content="2024-02-01" />
            <Sidebar />

            <main className="flex grow flex-col">
              {!channelId && <Header />}
              <div className="h-0 grow">
                <div id="feed-container" className="size-full">
                  {channelId && <ChannelHeader />}
                  <div className={cn('mt-4 container space-y-6', { 'max-w-3xl': enableMaxWidth })}>
                    {user?.farcaster && !username && !channelId && <CreatePostButton />}
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>
          <GlobalPlayer />
        </StakeProvider>
      </FeedProvider>
    </ProfileProvider>
  );
}
