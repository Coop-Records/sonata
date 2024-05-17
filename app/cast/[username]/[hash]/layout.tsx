'use client';

import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <div className="container flex justify-center font-helvetica bg-blend-color-burn md:gap-6">
        <div className="min-w-48 pt-16 max-md:hidden" />

        <Separator orientation="vertical" className="max-md:hidden" />

        <div className="flex max-w-full grow flex-col items-center gap-4">
          <div className="w-full grow">{children}</div>
        </div>
        <Separator orientation="vertical" className="max-md:hidden" />
        <div className="min-w-48 pt-16 max-md:hidden" />
      </div>
    </main>
  );
}
