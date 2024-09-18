import ClaimAirdropButton from '@/components/ClaimAirdropButton/ClaimAirdropButton';
import SignInButton from '@/components/SignInButton';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useTipProvider } from '@/providers/TipProvider';
import { useParams } from 'next/navigation';
import HomeButton from './HomeButton';
import UserMenu from './UserMenu';
import Balances from './Balances';

const HeaderButtonsGroup = ({ className = '' }) => {
  const { user, loading: userLoading } = useNeynarProvider();
  const { airdropBalance } = useTipProvider();
  const { username, channelId } = useParams();

  return (
    <div className={cn('relative px-6 pt-6 flex items-center justify-between', className)}>
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
      <div className="absolute left-0 top-0 flex justify-center items-center w-full h-full pointer-events-none">
        <p className="font-clashdisplay_semibold text-white pt-6 text-lg">Sonata</p>
      </div>
      {!user ? <Balances /> : <div />}
    </div>
  );
};

export default HeaderButtonsGroup;
