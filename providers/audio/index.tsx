import { ReactNode } from 'react';
import PlayerProvider from './PlayerProvider';
import { SoundProvider } from './SoundProvider';
import { SoundcloudProvider } from './SoundcloudProvider';
import { SpotifyProvider } from './SpotifyProvider';

export default function AudioProvider({ children }: { children: ReactNode }) {
  return (
    <SpotifyProvider>
      <SoundcloudProvider>
        <SoundProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </SoundProvider>
      </SoundcloudProvider>
    </SpotifyProvider>
  );
}
