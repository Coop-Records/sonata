'use client';

import FeedProvider from './FeedProvider';
import NeynarProvider from '@/providers/NeynarProvider';
import { SpotifyApiProvider } from './SpotifyApiProvider';
import { SoundcloudApiProvider } from './SoundcloudApiProvider';
import PlayerProvider from './PlayerProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <FeedProvider>
        <SpotifyApiProvider>
          <SoundcloudApiProvider>
            <PlayerProvider>{children}</PlayerProvider>
          </SoundcloudApiProvider>
        </SpotifyApiProvider>
      </FeedProvider>
    </NeynarProvider>
  );
}
