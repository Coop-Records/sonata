import { ReactNode } from 'react';
import PlayerProvider from './PlayerProvider';
import { SoundcloudProvider } from './SoundcloudProvider';
import { SpotifyProvider } from './SpotifyProvider';
import { YoutubeProvider } from './YoutubeProvider';
import { HTMLAudioProvider } from './HTMLAudioProvider';

export default function AudioProvider({ children }: { children: ReactNode }) {
  return (
    <SpotifyProvider>
      <SoundcloudProvider>
        <YoutubeProvider>
          <HTMLAudioProvider>
            <PlayerProvider>{children}</PlayerProvider>
          </HTMLAudioProvider>
        </YoutubeProvider>
      </SoundcloudProvider>
    </SpotifyProvider>
  );
}
