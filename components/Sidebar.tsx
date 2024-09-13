import SignInButton from './SignInButton';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import ChannelFilter from './Feed/ChannelFilter';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MobileMenu({ isSingleCast = false }: { isSingleCast?: boolean }) {
  const { user, signOut } = useNeynarProvider();

  return (
    <div className="flex h-full flex-col gap-4 md:px-16 md:py-6">
      <Link href="/" className="mb-8 flex items-center gap-2 max-md:hidden">
        <Image src="/images/notes.png" width={20} height={20} alt="" />
        <span className="font-semibold">Sonata</span>
      </Link>
      <Avatar className="size-9 cursor-pointer">
        <AvatarImage className="object-cover object-center" src={user?.pfp_url} />
        <AvatarFallback>{user?.display_name?.[0]}</AvatarFallback>
      </Avatar>
      <Separator className="!bg-border-light" />
      {!isSingleCast && <ChannelFilter />}
      <a
        href="https://warpcast.com/~/channel/sonata"
        className="mt-auto flex items-center gap-2 self-start text-white"
      >
        <span>Follow Sonata</span>
        <Image src="/images/warpcast.png" alt="warpcast" width={18} height={18} />
      </a>
      <div className="md:hidden">
        {user ? (
          <Button onClick={signOut} variant="secondary" className="w-full">
            Logout
          </Button>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
