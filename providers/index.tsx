'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import TipProvider from './TipProvider';
import UiProvider from './UiProvider';
import AudioProvider from './audio';

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
