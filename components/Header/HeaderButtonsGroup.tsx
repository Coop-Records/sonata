import SignInButton from '@/components/SignInButton';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import HomeButton from './HomeButton';
import UserMenu from './UserMenu';
import { usePrivy } from '@privy-io/react-auth';

const HeaderButtonsGroup = ({ className = '' }) => {
  const { ready, authenticated } = usePrivy();
  const { username, channelId } = useParams();

  return (
    <div className={cn('container flex items-center relative', className)}>
      {username || channelId ? (
        <HomeButton />
      ) : !ready ? (
        <Skeleton className="size-9 rounded-full" />
      ) : authenticated ? (
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      ) : (
        <SignInButton />
      )}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-clashDisplay text-lg font-semibold text-white">
        Sonata
      </div>
    </div>
  );
};

export default HeaderButtonsGroup;
