'use client';

import UiProvider from './UiProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <UiProvider>{children}</UiProvider>;
}
