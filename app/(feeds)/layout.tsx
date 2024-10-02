'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
import Header from '@/components/Header';
import GlobalPlayer from '@/components/GlobalPlayer';
import CreatePost from '@/components/CreatePost';
import FeedProvider from '@/providers/FeedProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import { useParams } from 'next/navigation';
import TipsList from '@/components/TipsList';
import StakeProvider from '@/providers/StakeProvider';
import { cn } from '@/lib/utils';
import ChannelHeader from '@/components/Header/ChannelHeader';
import { usePrivy } from '@privy-io/react-auth';

export default function FeedLayout({ children }: { children: ReactNode }) {
  const { menuOpen, setMenuOpen } = useUi();
  const { username, channelId } = useParams();
  const { user } = usePrivy();
  const enableMaxWidth = !channelId && !username;

  return (
    <ProfileProvider>
      <FeedProvider>
        <StakeProvider>
          <TipsList />
          <div className="flex grow">
            <meta property="of:accepts:xmtp" content="2024-02-01" />
            <nav className="md:hidden">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetContent side="left">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </nav>

            <nav className="shadow-xl max-md:hidden">
              <Sidebar />
            </nav>

            <main className="flex grow flex-col">
              {!channelId && <Header />}
              <div className="h-0 grow">
                <div id="feed-container" className="size-full">
                  {channelId && <ChannelHeader />}
                  <div className={cn('mt-4 container space-y-6', { 'max-w-3xl': enableMaxWidth })}>
                    {user?.farcaster && !username && !channelId && <CreatePost />}
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
