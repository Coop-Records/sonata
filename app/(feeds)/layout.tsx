'use client';
import FeedFilter from '@/components/Feed/Filter';
import { ReactNode } from 'react';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <div className="container flex justify-center py-12 font-helvetica bg-blend-color-burn">
        <div className="flex w-full max-w-4xl items-start md:gap-10">
          <div className="max-w-full grow">{children}</div>
          <div className="max-md:hidden">
            <FeedFilter />
          </div>
        </div>
      </div>
    </main>
  );
}
