import ClaimAirdropButton from '@/components/ClaimAirdropButton/ClaimAirdropButton';
import SignInButton from '@/components/SignInButton';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useTipProvider } from '@/providers/TipProvider';
import { useUi } from '@/providers/UiProvider';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
import HomeButton from './HomeButton';
import UserMenu from './UserMenu';

const HeaderButtonsGroup = ({ className = '' }) => {
  const { user, loading: userLoading } = useNeynarProvider();
  const { menuOpen, setMenuOpen } = useUi();
  const { airdropBalance } = useTipProvider();
  const { username, channelId } = useParams();

  return (
    <div className={cn("container flex items-center justify-between md:justify-end", className)}>
      <Button
        variant="link"
        className={cn('p-0 text-5xl md:hidden', channelId && 'text-white')}
      >
        <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
      </Button>
      {(username || channelId) && (
        <HomeButton className={cn('mr-auto max-md:hidden', channelId && 'text-white')} />
      )}
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
  );
};

export default HeaderButtonsGroup;
