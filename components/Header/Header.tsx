'use client';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import UserMenu from './UserMenu';
import SignInButton from '../SignInButton';
import Tabs from '../Tabs';
import { tabs } from '@/lib/consts';
import { Button } from '../ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useUi } from '@/providers/UiProvider';

const Header = () => {
  const { user, loading: userLoading } = useNeynarProvider();
  const { menuOpen, setMenuOpen } = useUi();

  return (
    <header className="w-full pt-2 sm:pt-4">
      <div className="flex items-center justify-between md:justify-end">
        <Button variant="link" className="p-0 text-5xl md:hidden">
          <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
        </Button>
        {userLoading ? <></> : user ? <UserMenu /> : <SignInButton />}
      </div>
      <div className="flex justify-center">
        <Tabs tabs={tabs} />
      </div>
    </header>
  );
};

export default Header;
