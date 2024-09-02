'use client';

import NeynarProvider from '@/providers/NeynarProvider';
import AudioProvider from './audio';
import TipProvider from './TipProvider';
import UiProvider from './UiProvider';
import PrivyProvider from './PrivyProvider';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <PrivyProvider>
    <NeynarProvider>
      <TipProvider>
        <UiProvider>
          <AudioProvider>{children}</AudioProvider>
        </UiProvider>
      </TipProvider>
    </NeynarProvider>
  </PrivyProvider>
);

export default Providers;
