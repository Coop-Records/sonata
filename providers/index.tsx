'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import TipProvider from './TipProvider';
import UiProvider from './UiProvider';
import AudioProvider from './audio';
import ChannelStakeProvider from './StakeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <TipProvider>
        <ChannelStakeProvider>
          <UiProvider>
            <AudioProvider>{children}</AudioProvider>
          </UiProvider>
        </ChannelStakeProvider>
      </TipProvider>
    </NeynarProvider>
  );
}
