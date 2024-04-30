'use client';

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
        <StackProvider>
          <SpotifyApiProvider>
            <SoundcloudApiProvider>
              <PlayerProvider>{children}</PlayerProvider>
            </SoundcloudApiProvider>
          </SpotifyApiProvider>
        </StackProvider>
      </SupabaseProvider>
    </NeynarProvider>
  );
}
