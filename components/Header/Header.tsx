'use client';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import UserMenu from './UserMenu';
import SignInButton from '@/components/SignInButton';
import Tabs from '@/components/Tabs';
import { tabs } from '@/lib/consts';
import { Button } from '@/components/ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useUi } from '@/providers/UiProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { useFeedProvider } from '@/providers/FeedProvider';
import ClaimAirdropButton from '@/components/ClaimAirdropButton/ClaimAirdropButton';
import { useTipProvider } from '@/providers/TipProvider';
import { useParams } from 'next/navigation';
import Profile from '../Profile';
import HomeButton from './HomeButton';

const Header = () => {
  const { user, loading: userLoading } = useNeynarProvider();
  const { feedType } = useFeedProvider();
  const { menuOpen, setMenuOpen } = useUi();
  const { airdropBalance } = useTipProvider();
  const { username, hash } = useParams();
  return (
    <header className="container w-full pt-2 md:pt-6">
      <div className="flex items-center justify-between md:justify-end">
        <Button variant="link" className="p-0 text-5xl md:hidden">
          <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
        </Button>
        {username && <HomeButton />}
        {userLoading ? (
          <Skeleton className="size-9 rounded-full" />
        ) : user ? (
          <div className="flex items-center gap-2">
            {airdropBalance > 0 && <ClaimAirdropButton />}
            <UserMenu />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
      {username && !hash && <Profile />}
      {feedType && (
        <div
          className={`container mx-auto flex max-w-3xl ${username ? 'justify-start' : 'justify-center'}`}
        >
          <Tabs tabs={tabs} />
        </div>
      )}
    </header>
  );
};

export default Header;
