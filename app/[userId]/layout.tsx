'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useUi } from '@/providers/UiProvider';
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
         
           
            <div className='container  flex w-full flex-row pt-2 md:pt-6'>

                <a href="/" className="flex flex-row items-center font-semibold md:px-16">
                  
                  <CaretLeftIcon />
                  <div className="">Home</div>
                </a>
                <div className='right-corner flex'>

                
                    <div className='custom-width  flex flex-col rounded-full '>
                        <img className='w-4 md:w-8' alt="User" src="/images/Ellipse_57.png" />
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
               <div className="container mx-auto space-y-6 md:px-16">
                  
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
