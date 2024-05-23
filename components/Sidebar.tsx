import BalanceInfo from '@/components/BalanceInfo';
import SignInButton from './SignInButton';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import ChannelFilter from './Feed/ChannelFilter';
import Image from 'next/image';
import UserDetails from './UserDetails';
import { ExitIcon } from '@radix-ui/react-icons';

export default function MobileMenu() {
  const { user, signOut } = useNeynarProvider();

  return (
    <div className="flex h-full flex-col gap-4 md:px-16 md:py-6">
      <div className="mb-8 flex items-center gap-2 max-md:hidden">
        <Image src="/images/notes.png" width={20} height={20} alt="" />
        <span className="font-semibold">Sonata</span>
      </div>
      {user && <UserDetails className="mb-8 md:hidden" user={user} />}

      <BalanceInfo />

      <a
        className="flex items-center gap-2"
        href="https://www.stack.so/leaderboard/sonata"
        target="_blank"
      >
        <Image src="/images/notes.png" width={20} height={20} alt="" />
        <span className="font-semibold">Notes Leaderboard</span>
      </a>
      <Separator />

      <ChannelFilter />

      <div className="mt-auto">
        <p className="mb-2">Follow Sonata</p>
        <a href="https://warpcast.com/~/channel/sonata">
          <Image src="/images/warpcast.png" alt="warpcast" width={32} height={32} />
        </a>
      </div>

      <div className="space-y-2 md:hidden">
        {user ? (
          <Button
            onClick={signOut}
            className="flex w-full items-center justify-between"
            variant="secondary"
          >
            <span>Logout</span>
            <ExitIcon className="size-6" />
          </Button>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
