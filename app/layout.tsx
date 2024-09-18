import Providers from '@/providers';
import { Sora } from 'next/font/google';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { headers } from 'next/headers';
import { DEFAULT_FRAME, DESCRIPTION, TITLE, VERCEL_URL } from '@/lib/consts';
import { getFrameMetadata } from '@coinbase/onchainkit';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: `${VERCEL_URL}/images/og.png`,
  },
  other: {
    ...frameMetadata,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const headersList = headers();
  const headerUrl = headersList.get('x-url') || '';
  const backgroundColor = headerUrl?.includes('/api')
    ? 'bg-gray-100'
    : "bg-cover bg-[url('/images/mobile-bg.png')]";

  return (
    <html lang="en" className={sora.variable}>
      <body
        className={cn('flex h-screen w-screen flex-col overflow-hidden font-sora', backgroundColor)}
      >
        <Providers>
          <div id="player-portal" className="pointer-events-none fixed left-0 top-0 opacity-0" />
          {children}
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
