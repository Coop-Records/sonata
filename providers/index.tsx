'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import { SpotifyApiProvider } from './SpotifyApiProvider';
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
          <SpotifyApiProvider>
            <SoundcloudApiProvider>
              <PlayerProvider>
                <FeedProvider>{children}</FeedProvider>
              </PlayerProvider>
            </SoundcloudApiProvider>
          </SpotifyApiProvider>
        </TipProvider>
      </SupabaseProvider>
    </NeynarProvider>
  );
}
