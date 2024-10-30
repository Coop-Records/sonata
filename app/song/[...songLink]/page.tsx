'use client';

import GlobalPlayer from '@/components/GlobalPlayer';
import Sidebar from '@/components/Sidebar';
import SongPage from '@/components/SongPage';
import { Separator } from '@/components/ui/separator';
import SongPageProvider from '@/providers/SongPageProvider';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex grow flex-col">
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <div className="flex grow">
        <Sidebar isSingleCast />

        <main className="flex grow flex-col">
          <Separator className="bg-muted" />
          <div className="relative grow">
            <div
              className="absolute left-0 top-0 size-full overflow-scroll pt-4"
              id="feed-container"
            >
              <div className="container mx-auto max-w-3xl space-y-6">
                <Link href="/" className="flex flex-row items-center font-semibold">
                  <CaretLeftIcon />
                  <div className="">Home</div>
                </Link>
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
