import Providers from '@/providers';
import { Sora } from 'next/font/google';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

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
  return (
    <html lang="en" className={sora.variable}>
      <body className="min-h-screen w-screen overflow-x-hidden font-sora">
        <Providers>
          <div className="bg-white">
            {children}
            <Toaster />
          </div>
          <div id="player-portal" className="fixed left-0 top-0 -z-10 opacity-0" />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
