'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
import GlobalPlayer from '@/components/GlobalPlayer';
import FeedProvider from '@/providers/FeedProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import TipsList from '@/components/TipsList';
import FeedContainer from '@/components/FeedContainer';

export default function FeedLayout({ children }: { children: ReactNode }) {
  const { menuOpen, setMenuOpen } = useUi();

  return (
    <ProfileProvider>
      <FeedProvider>
        <TipsList />
        <div className="flex grow flex-col">
          <meta property="of:accepts:xmtp" content="2024-02-01" />
          <div className="flex grow">
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
              <FeedContainer>
                {children}
              </FeedContainer>
            </main>
          </div>

          <GlobalPlayer />
        </div>
      </FeedProvider>
    </ProfileProvider>
  );
}
