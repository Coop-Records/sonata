import Providers from '@/providers';
import '../styles/globals.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import GlobalPlayer from '@/components/GlobalPlayer';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-proxima',
          inter.variable,
          'min-h-screen w-screen overflow-x-hidden flex flex-col',
        )}
      >
        <Providers>
          <div className="flex grow flex-col bg-white">
            <Header />
            {children}
            <GlobalPlayer />
            <Toaster />
          </div>
          <div id="player-portal" className="fixed left-0 top-0 -z-10 opacity-0" />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
