'use client';

import { AuthKitProvider } from '@farcaster/auth-kit';
import '../styles/globals.css';
import '@farcaster/auth-kit/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalProvider } from '@/hooks/useModal';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

const config = {
  relay: 'https://relay.farcaster.xyz',
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'sonatamusic.vercel.app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          <AuthKitProvider config={config}>
            {children}
            <div id="modal-root" />
            <ToastContainer />
          </AuthKitProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
