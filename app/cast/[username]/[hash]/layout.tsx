'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Separator } from '@/components/ui/separator';
import GlobalPlayer from '@/components/GlobalPlayer';
import FeedProvider from '@/providers/FeedProvider';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import ProfileProvider from '@/providers/ProfileProvider';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileProvider>
      <FeedProvider>
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
                    <a href="/" className="flex flex-row items-center font-semibold">
                      <CaretLeftIcon />
                      <div className="">Home</div>
                    </a>
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>

          <GlobalPlayer />
        </div>
      </FeedProvider>
    </ProfileProvider>
  );
}
