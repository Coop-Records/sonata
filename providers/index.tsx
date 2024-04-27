'use client';

import { AuthKitProvider } from '@farcaster/auth-kit';
import FeedProvider from './FeedProvider';
import NeynarProvider from '@/providers/NeynarProvider';
import { SpotifyApiProvider } from './SpotifyApiProvider';
import { SoundcloudApiProvider } from './SoundcloudApiProvider';
import PlayerProvider from './PlayerProvider';
import StackProvider from './StackProvider';

const authConfig = {
  relay: 'https://relay.farcaster.xyz',
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'sonatamusic.vercel.app',
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthKitProvider config={authConfig}>
      <NeynarProvider>
        <StackProvider>
          <FeedProvider>
            <SpotifyApiProvider>
              <SoundcloudApiProvider>
                <PlayerProvider>{children}</PlayerProvider>
              </SoundcloudApiProvider>
            </SpotifyApiProvider>
          </FeedProvider>
        </StackProvider>
      </NeynarProvider>
    </AuthKitProvider>
  );
}
