import SignInButton from './SignInButton';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Separator } from './ui/separator';
import ChannelFilter from './Feed/ChannelFilter';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from './ui/icon';

export default function MobileMenu({ isSingleCast = false }: { isSingleCast?: boolean }) {
  const { user, signOut } = useNeynarProvider();

  return (
    <div className="flex h-full flex-col gap-4 md:px-16 md:py-6">
      <Link href="/" className="mb-8 flex items-center gap-2 max-md:hidden">
        <Image src="/images/notes.png" width={20} height={20} alt="" />
        <span className="font-clashdisplay_medium">Sonata</span>
      </Link>
      <div className="pt-4 pl-6">
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage className="object-cover object-center" src={user?.pfp_url} />
          <AvatarFallback>{user?.display_name?.[0]}</AvatarFallback>
        </Avatar>
      </div>
      <Separator className="!bg-border-light" />
      {!isSingleCast && <ChannelFilter />}
      <Separator className="!bg-border-light" />
      <div className="md:hidden pl-4 pb-6">
        {user ? (
          <>
            <button
              onClick={signOut}
              type="button"
              className="w-full text-white font-clashdisplay_medium flex items-center gap-1 mt-4 ml-2"
            >
              Logout <Icon name="exit" />
            </button>
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
