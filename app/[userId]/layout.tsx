'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
import GlobalPlayer from '@/components/GlobalPlayer';
import FeedProvider from '@/providers/FeedProvider';
import ClaimAirdropButton from '@/components/ClaimAirdropButton/ClaimAirdropButton';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import UserMenu from '@/components/Header/UserMenu';
import { Skeleton } from "@/components/ui/skeleton";
import SignInButton from "@/components/SignInButton";
import { useTipProvider } from "@/providers/TipProvider";
export default function FeedLayout({ children }: { children: ReactNode }) {
  const { menuOpen, setMenuOpen } = useUi();
  const { user, loading: userLoading } = useNeynarProvider();
  const { airdropBalance } = useTipProvider();

  return (
    <FeedProvider>
      <div className="flex grow flex-col">
        <meta property="of:accepts:xmtp" content="2024-02-01" />
        <div className="flex grow">
          <nav className="md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetContent side="left">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </nav>

          <nav className="shadow-xl max-md:hidden">
            <Sidebar />
          </nav>

          <main className="flex  grow flex-col">
            <div className="flex justify-between max-w-3xl w-full px-2 mx-auto items-center pt-12">
              <Link href={'/'} className="flex item-center gap-1 text-lg font-semibold text-[#333536]">
                <ChevronLeft size={24} /> Home
              </Link>

                {userLoading ? (
                    <Skeleton className="size-9 rounded-full"/>
                ) : user ? (
                    <div className="flex items-center gap-2">
                      {airdropBalance > 0 && <ClaimAirdropButton/>}
                      <UserMenu/>
                    </div>
                ) : (
                    <SignInButton/>
                )}

            </div>

            <div className="container mx-auto max-w-3xl space-y-6">{children}</div>
          </main>
        </div>

        <GlobalPlayer />
      </div>
    </FeedProvider>
  );
}
