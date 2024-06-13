'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
import GlobalPlayer from '@/components/GlobalPlayer';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import FeedProvider from '@/providers/FeedProvider';
import ClaimAirdropButton from "@/components/ClaimAirdropButton/ClaimAirdropButton";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

export default function FeedLayout({ children }: { children: ReactNode }) {
    const { menuOpen, setMenuOpen } = useUi();

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

                    <main className="flex grow flex-col">
                        <div className="flex justify-between items-center px-20 pt-12">
                <       Link href={'/'} className="flex item-center gap-1" ><ArrowLeft size={24} /> Home</Link>
                        <div className='flex items-center gap-2'>
                            <ClaimAirdropButton/>
                            <Avatar className="size-8">
                                <AvatarImage src={'images/user.png'}/>
                            </Avatar>
                        </div>
                        </div>


                                <div className="container mx-auto max-w-3xl space-y-6">
                                    {children}
                                </div>


                    </main>
                </div>

                <GlobalPlayer/>
            </div>
        </FeedProvider>
    );
}
