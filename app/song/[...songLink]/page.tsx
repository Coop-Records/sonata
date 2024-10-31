'use client';

import SongPage from '@/components/SongPage';
import SongPageProvider from '@/providers/SongPageProvider';

export default function Page() {
  return (
    <div className="flex grow flex-col">
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <SongPageProvider>
        <SongPage />
      </SongPageProvider>
    </div>
  );
}
