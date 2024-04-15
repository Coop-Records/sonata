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
  // For a production app, replace this with an Optimism Mainnet
  // RPC URL from a provider like Alchemy or Infura.
  relay: 'https://relay.farcaster.xyz',
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'sonatamusic.vercel.app',
  siweUri: 'http://localhost:3000/',
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
