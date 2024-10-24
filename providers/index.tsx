'use client';

import AudioProvider from './audio';
import TipProvider from './TipProvider';
import UiProvider from './UiProvider';
import PrivyProvider from './PrivyProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider>
      <TipProvider>
        <UiProvider>
          <AudioProvider>{children}</AudioProvider>
        </UiProvider>
      </TipProvider>
    </PrivyProvider>
  );
}
