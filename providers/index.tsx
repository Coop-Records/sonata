'use client';

import FeedProvider from './FeedProvider';
import NeynarProvider from '@/providers/NeynarProvider';
import { SpotifyApiProvider } from './SpotifyApiProvider';
import { SoundcloudApiProvider } from './SoundcloudApiProvider';
import PlayerProvider from './PlayerProvider';
import SupabaseProvider from './SupabaseProvider';
import StackProvider from './StackProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <SupabaseProvider>
        <FeedProvider>
          <StackProvider>
            <SpotifyApiProvider>
              <SoundcloudApiProvider>
                <PlayerProvider>{children}</PlayerProvider>
              </SoundcloudApiProvider>
            </SpotifyApiProvider>
          </StackProvider>
        </FeedProvider>
      </SupabaseProvider>
    </NeynarProvider>
  );
}
