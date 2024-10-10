import SignInButton from '@/components/SignInButton';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useUi } from '@/providers/UiProvider';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
import HomeButton from './HomeButton';
import UserMenu from './UserMenu';
import { usePrivy } from '@privy-io/react-auth';

const HeaderButtonsGroup = ({ className = '' }) => {
  const { ready, authenticated } = usePrivy();
  const { menuOpen, setMenuOpen } = useUi();
  const { username, channelId } = useParams();

  return (
    <div className={cn('container flex items-center justify-between md:justify-end', className)}>
      <Button variant="link" className={cn('p-0 text-5xl md:hidden', channelId && 'text-white')}>
        <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
      </Button>
      {(username || channelId) && (
        <HomeButton className={cn('mr-auto max-md:hidden', channelId && 'text-white')} />
      )}
      {!ready ? (
        <Skeleton className="size-9 rounded-full" />
      ) : authenticated ? (
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

export default HeaderButtonsGroup;
