'use client';

import { AuthKitProvider } from '@farcaster/auth-kit';
import '../styles/globals.css';
import '@farcaster/auth-kit/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <AuthKitProvider config={config}>
          {children}
          <ToastContainer />
        </AuthKitProvider>
      </body>
    </html>
  );
}
