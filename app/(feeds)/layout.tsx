'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
import Header from '@/components/Header';
import GlobalPlayer from '@/components/GlobalPlayer';
import FeedProvider from '@/providers/FeedProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import { useParams } from 'next/navigation';
import StakeProvider from '@/providers/StakeProvider';
import { cn } from '@/lib/utils';

export default function FeedLayout({ children }: { children: ReactNode }) {
  const { menuOpen, setMenuOpen } = useUi();
  const { username, channelId } = useParams();
  const enableMaxWidth = !channelId && !username;
  const { setIsCastPostOpen } = useUi();

  return (
    <ProfileProvider>
      <FeedProvider>
        <StakeProvider>
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
              <Header />
              <div className="h-0 grow">
                <div id="feed-container" className="size-full">
                  <div className={cn('mt-4 px-6 space-y-6', { 'max-w-3xl': enableMaxWidth })}>
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>
          <button
            type="button"
            className="bg-blue fixed z-40 bottom-4 right-4 text-white text-[32px] w-16 h-16 rounded-full"
            onClick={() => setIsCastPostOpen(true)}
          >
            +
          </button>
          <GlobalPlayer />
        </StakeProvider>
      </FeedProvider>
    </ProfileProvider>
  );
}
