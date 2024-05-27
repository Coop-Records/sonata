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

const Header = () => {
  const { user, loading: userLoading } = useNeynarProvider();
  const { feedType } = useFeedProvider();
  const { menuOpen, setMenuOpen } = useUi();

  return (
    <header className="container w-full pt-2 md:pt-6">
      <div className="flex items-center justify-between md:justify-end">
        <Button variant="link" className="p-0 text-5xl md:hidden">
          <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
        </Button>
        {userLoading ? (
          <Skeleton className="size-9 rounded-full" />
        ) : user ? (
          <UserMenu />
        ) : (
          <SignInButton />
        )}
      </div>
      {feedType && (
        <div className="flex justify-center">
          <Tabs tabs={tabs} />
        </div>
      )}
    </header>
  );
};

export default Header;
