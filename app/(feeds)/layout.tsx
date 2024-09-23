'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
import Header from '@/components/Header';
import GlobalPlayer from '@/components/GlobalPlayer';
import FeedProvider from '@/providers/FeedProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import StakeProvider from '@/providers/StakeProvider';

export default function FeedLayout({ children }: { children: ReactNode }) {
  const { menuOpen, setMenuOpen } = useUi();
  const { setIsCastPostOpen } = useUi();

  return (
    <ProfileProvider>
      <FeedProvider>
        <StakeProvider>
          <div className="flex h-screen">
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

            <main className="flex flex-col h-full flex-col overflow-hidden w-full">
              <Header />
              <div className="h-0 grow overflow-y-hidden">
                <div id="feed-container" className="size-full px-6 mt-4 space-y-6">
                  {children}
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
