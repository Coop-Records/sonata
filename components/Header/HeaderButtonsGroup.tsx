import SignInButton from '@/components/SignInButton';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useUi } from '@/providers/UiProvider';
import { useParams } from 'next/navigation';
import HomeButton from './HomeButton';
import UserMenu from './UserMenu';
import { usePrivy } from '@privy-io/react-auth';
import UserAvatar from '@/components/UserAvatar';
import BalanceMenu from '@/components/Balance/BalanceMenu';

const HeaderButtonsGroup = ({ className = '' }) => {
  const { ready, authenticated } = usePrivy();
  const { username, channelId } = useParams();

  const { isMobile, setMenuOpen, menuOpen } = useUi();

  return (
    <div className={cn('container flex items-center relative justify-between', className)}>
      {username || channelId ? (
        <HomeButton />
      ) : !ready ? (
        <Skeleton className="size-9 rounded-full" />
      ) : authenticated ? (
        isMobile ? (
          <UserAvatar onClick={() => setMenuOpen(!menuOpen)} />
        ) : (
          <UserMenu />
        )
      ) : (
        <SignInButton />
      )}
      <div className="pointer-events-none font-clashDisplay text-lg font-semibold text-white">
        Sonata
      </div>
      {authenticated && <BalanceMenu />}
    </div>
  );
};

export default HeaderButtonsGroup;
