'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import { SpotifyControllerProvider } from './SpotifyControllerProvider';
import { SoundcloudWidgetProvider } from './SoundcloudWidgetProvider';
import PlayerProvider from './PlayerProvider';
import SupabaseProvider from './SupabaseProvider';
import TipProvider from './TipProvider';
import FeedProvider from './FeedProvider';
import { SoundContextProvider } from './SoundContextProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <SupabaseProvider>
        <TipProvider>
          <SpotifyControllerProvider>
            <SoundcloudWidgetProvider>
              <SoundContextProvider>
                <PlayerProvider>
                  <FeedProvider>{children}</FeedProvider>
                </PlayerProvider>
              </SoundContextProvider>
            </SoundcloudWidgetProvider>
          </SpotifyControllerProvider>
        </TipProvider>
      </SupabaseProvider>
    </NeynarProvider>
  );
}
