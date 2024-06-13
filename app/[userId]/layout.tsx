'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
import Header from '@/components/UserHeader';
import { Separator } from '@/components/ui/separator';
import GlobalPlayer from '@/components/GlobalPlayer';
import FeedProvider from '@/providers/FeedProvider';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import  UserDetails  from '@/components/UserDetails-UI'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import  UserDetailsInfo  from '@/components/UserDetailsInfo'
//' ui/avatar';




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
         
           
            <div className='flex  flex-row container w-full pt-2 md:pt-6'>

                <a href="/" className="md:px-16 flex flex-row items-center font-semibold">
                  
                  <CaretLeftIcon />
                  <div className="">Home</div>
                </a>
                <div className='flex right-corner'>

                
                    <div className='flex  rounded-full custom-width flex-col '>
                        <img className='w-4 md:w-8' src="/images/Ellipse_57.png" />
                        <span>Claim Airdrop</span>
                    </div>
                    <a href="#" target="_blank">
                        <Avatar className="w-4 md:w-8">
                        <AvatarImage src="/images/Ellipse_63.png" />
                        <AvatarFallback>Akhil</AvatarFallback>
                        </Avatar>
                    </a>
                </div>
                


            </div>
           
            


           <br></br>
           <br></br>
            <div className="relative grow">
              <div
                className="absolute left-0 top-0 size-full overflow-scroll pt-4"
                id="feed-container"
              >
               <div className="container mx-auto md:px-16 space-y-6">
                  
                {/* {feedType && (
                        <div className="flex justify-center">
                            <Tabs tabs={tabs} />
                            </div>
                        )} */}


                <UserDetails />
                <UserDetailsInfo />
                {children}
                  

                </div>
              </div>
            </div>
          </main>
        </div>

        <GlobalPlayer />
      </div>
    </FeedProvider>
  );
}
