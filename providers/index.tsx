'use client';

import AudioProvider from './audio';
import TipProvider from './TipProvider';
import UiProvider from './UiProvider';
import PrivyProvider from './PrivyProvider';
import ProfileProvider from './ProfileProvider';
import StakeProvider from './StakeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider>
      <TipProvider>
        <UiProvider>
          <AudioProvider>
            <ProfileProvider>
              <StakeProvider>{children}</StakeProvider>
            </ProfileProvider>
          </AudioProvider>
        </UiProvider>
      </TipProvider>
    </PrivyProvider>
  );
}
