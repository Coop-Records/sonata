import Providers from '@/providers';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import GlobalPlayer from '@/components/GlobalPlayer';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';

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
      <body className={cn('font-helvetica', inter.variable)}>
        <Providers>
          <Header />
          {children}
          <ToastContainer />
          <GlobalPlayer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
