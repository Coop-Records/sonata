'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import SupabaseProvider from './SupabaseProvider';
import TipProvider from './TipProvider';
import FeedProvider from './FeedProvider';
import UiProvider from './UiProvider';
import AudioProvider from './audio';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <SupabaseProvider>
        <TipProvider>
          <UiProvider>
            <AudioProvider>
              <FeedProvider>{children}</FeedProvider>
            </AudioProvider>
          </UiProvider>
        </TipProvider>
      </SupabaseProvider>
    </NeynarProvider>
  );
}
