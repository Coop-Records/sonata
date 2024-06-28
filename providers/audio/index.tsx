import { ReactNode } from 'react';
import PlayerProvider from './PlayerProvider';
import { SoundProvider } from './SoundProvider';
import { SoundcloudProvider } from './SoundcloudProvider';
import { SpotifyProvider } from './SpotifyProvider';
import { YoutubeProvider } from './YoutubeProvider';
import { ZoraProvider } from './ZoraProvider';

export default function AudioProvider({ children }: { children: ReactNode }) {
  return (
    <SpotifyProvider>
      <SoundcloudProvider>
        <SoundProvider>
          <YoutubeProvider>
            <ZoraProvider>
              <PlayerProvider>{children}</PlayerProvider>
            </ZoraProvider>
          </YoutubeProvider>
        </SoundProvider>
      </SoundcloudProvider>
    </SpotifyProvider>
  );
}
