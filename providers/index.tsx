'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import { SoundcloudApiProvider } from './SoundcloudApiProvider';
import PlayerProvider from './PlayerProvider';
import SupabaseProvider from './SupabaseProvider';
import TipProvider from './TipProvider';
import FeedProvider from './FeedProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <SupabaseProvider>
        <TipProvider>
          <SoundcloudApiProvider>
            <PlayerProvider>
              <FeedProvider>{children}</FeedProvider>
            </PlayerProvider>
          </SoundcloudApiProvider>
        </TipProvider>
      </SupabaseProvider>
    </NeynarProvider>
  );
}
