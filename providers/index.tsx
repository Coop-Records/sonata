'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import { SpotifyControllerProvider } from './SpotifyControllerProvider';
import { SoundcloudWidgetProvider } from './SoundcloudWidgetProvider';
import PlayerProvider from './PlayerProvider';
import SupabaseProvider from './SupabaseProvider';
import TipProvider from './TipProvider';
import FeedProvider from './FeedProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <SupabaseProvider>
        <TipProvider>
          <SpotifyControllerProvider>
            <SoundcloudWidgetProvider>
              <PlayerProvider>
                <FeedProvider>{children}</FeedProvider>
              </PlayerProvider>
            </SoundcloudWidgetProvider>
          </SpotifyControllerProvider>
        </TipProvider>
      </SupabaseProvider>
    </NeynarProvider>
  );
}
