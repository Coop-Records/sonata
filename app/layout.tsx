import Providers from '@/providers';
import { Sora } from 'next/font/google';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { headers } from 'next/headers';

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

  const backgroundColor = headerUrl?.includes('/api') ? 'bg-gray-100' : 'bg-white';

  return (
    <html lang="en" className={sora.variable}>
      <body
        className={`flex min-h-screen w-screen flex-col overflow-x-hidden font-sora ${backgroundColor}`}
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
