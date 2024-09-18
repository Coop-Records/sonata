'use client';

import GlobalPlayer from '@/components/GlobalPlayer';
import HeaderButtonsGroup from '@/components/Header/HeaderButtonsGroup';
import Sidebar from '@/components/Sidebar';
import SongPage from '@/components/SongPage';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import SongPageProvider from '@/providers/SongPageProvider';
import { useUi } from '@/providers/UiProvider';

export default function Page() {
  const { menuOpen, setMenuOpen } = useUi();

  return (
    <div className="flex grow flex-col">
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <div className="flex grow">
        <nav className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetContent side="left">
              <Sidebar isSingleCast />
            </SheetContent>
          </Sheet>
        </nav>

        <nav className="shadow-xl max-md:hidden">
          <Sidebar isSingleCast />
        </nav>

        <main className="flex grow flex-col">
          <div className="relative grow">
            <div
              className="absolute left-0 top-0 size-full overflow-scroll pt-4"
              id="feed-container"
            >
              <div className="mx-auto max-w-3xl space-y-6">
                <HeaderButtonsGroup />
                <SongPageProvider>
                  <SongPage />
                </SongPageProvider>
              </div>
            </div>
          </div>
        </main>
      </div>
      <GlobalPlayer />
    </div>
  );
}
