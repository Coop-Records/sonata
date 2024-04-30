'use client';
import FeedFilter from '@/components/Feed/Filter';
import { Button } from '@/components/ui/button';
import FeedProvider from '@/providers/FeedProvider';
import { FilterIcon } from 'lucide-react';
import { ReactNode } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <div className="container flex justify-center py-12 font-helvetica bg-blend-color-burn">
        <div className="flex w-full max-w-4xl items-start gap-10">
          <FeedProvider>
            <div className="max-w-full grow">{children}</div>
            <div className="max-md:hidden">
              <FeedFilter />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="fixed bottom-10 right-6 size-16 rounded-full md:hidden">
                  <FilterIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter</SheetTitle>
                  <SheetDescription>Select the filters to apply to your feed</SheetDescription>
                </SheetHeader>
                <div className="my-5">
                  <FeedFilter />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Done</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </FeedProvider>
        </div>
      </div>
    </main>
  );
}
