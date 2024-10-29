import BalanceInfo from '@/components/BalanceInfo';
import SignInButton from './SignInButton';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import ChannelFilter from './Feed/ChannelFilter';
import Image from 'next/image';
import Link from 'next/link';
import HomeButton from './Header/HomeButton';
import { usePrivy } from '@privy-io/react-auth';

export default function MobileMenu({ isSingleCast = false }: { isSingleCast?: boolean }) {
  const { authenticated, logout } = usePrivy();

  return (
    <div className="flex h-full flex-col gap-4 md:px-16 md:py-6">
      <Link href="/" className="mb-8 flex items-center gap-2 max-md:hidden">
        <Image src="/images/notes.png" width={20} height={20} alt="" />
        <span className="font-clashDisplay font-semibold">Sonata</span>
      </Link>
      <HomeButton className="mb-2 md:hidden" />
      <BalanceInfo />
      <a
        className="flex items-center gap-2"
        href="https://www.stack.so/leaderboard/sonata"
        target="_blank"
      >
        <Image src="/images/notes.png" width={20} height={20} alt="" />
        <span className="font-semibold">View Leaderboard</span>
      </a>
      <Separator />

      {!isSingleCast && <ChannelFilter />}
      <a
        href="https://warpcast.com/~/channel/sonata"
        className="mt-auto flex items-center gap-2 self-start"
      >
        <span>Follow Sonata</span>
        <Image src="/images/warpcast.png" alt="warpcast" width={18} height={18} />
      </a>
      <div className="md:hidden">
        {authenticated ? (
          <Button onClick={logout} variant="secondary" className="w-full">
            Logout
          </Button>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
