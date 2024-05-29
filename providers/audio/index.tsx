import { ReactNode } from 'react';
import PlayerProvider from './PlayerProvider';
import { SoundProvider } from './SoundProvider';
import { SoundcloudProvider } from './SoundcloudProvider';
import { SpotifyProvider } from './SpotifyProvider';
import { YoutubeProvider } from './YoutubeProvider';

export default function AudioProvider({ children }: { children: ReactNode }) {
  return (
    <SpotifyProvider>
      <SoundcloudProvider>
        <SoundProvider>
          <YoutubeProvider>
            <PlayerProvider>{children}</PlayerProvider>
          </YoutubeProvider>
        </SoundProvider>
      </SoundcloudProvider>
    </SpotifyProvider>
  );
}
