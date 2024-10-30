import SignInButton from '@/components/SignInButton';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useUi } from '@/providers/UiProvider';
import { useParams } from 'next/navigation';
import HomeButton from './HomeButton';
import UserMenu from './UserMenu';
import { usePrivy } from '@privy-io/react-auth';
import UserAvatar from '@/components/UserAvatar';
import Image from 'next/image';

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
      <Image
        src="/images/notes.jpg"
        alt="Sonata Logo"
        width={36}
        height={36}
        className={cn('rounded-full', !authenticated && 'opacity-0 pointer-events-none')}
      />
    </div>
  );
};

export default HeaderButtonsGroup;
