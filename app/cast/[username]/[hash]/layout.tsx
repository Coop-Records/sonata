'use client';

import { ReactNode } from 'react';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container flex grow items-center justify-center">
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      {children}
    </main>
  );
}
