'use client';

import UserProvider from '@/providers/UserProvider';
import AudioProvider from './audio';
import TipProvider from './TipProvider';
import UiProvider from './UiProvider';
import PrivyProvider from './PrivyProvider';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <PrivyProvider>
    <UserProvider>
      <TipProvider>
        <UiProvider>
          <AudioProvider>{children}</AudioProvider>
        </UiProvider>
      </TipProvider>
    </UserProvider>
  </PrivyProvider>
);

export default Providers;
