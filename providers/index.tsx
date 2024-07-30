'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import AudioProvider from './audio';
import TipProvider from './TipProvider';
import UiProvider from './UiProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeynarProvider>
      <TipProvider>
        <UiProvider>
          <AudioProvider>{children}</AudioProvider>
        </UiProvider>
      </TipProvider>
    </NeynarProvider>
  );
}
