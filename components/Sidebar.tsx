import SignInButton from './SignInButton';
import { useUserProvider } from '@/providers/UserProvider';
import { Separator } from './ui/separator';
import ChannelFilter from './Feed/ChannelFilter';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from './ui/icon';
import { useUi } from '@/providers/UiProvider';

export default function MobileMenu({ isSingleCast = false }: { isSingleCast?: boolean }) {
  const { setMenuOpen } = useUi();
  const { user, signOut } = useUserProvider();

  const handleLogout = async () => {
    await signOut();
    setMenuOpen(false);
  };
  return (
    <div className="flex h-full flex-col gap-4 md:px-16 md:py-6">
      <Link href="/" className="mb-8 flex items-center gap-2 max-md:hidden">
        <Image src="/images/notes.png" width={20} height={20} alt="" />
        <span className="font-clashdisplay_medium">Sonata</span>
      </Link>
      <div className="pt-8 pl-6">
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage className="object-cover object-center" src={user?.pfp_url} />
          <AvatarFallback>{user?.display_name?.[0]}</AvatarFallback>
        </Avatar>
      </div>
      <Separator className="!bg-border-light" />
      {!isSingleCast && <ChannelFilter />}
      <Separator className="!bg-border-light" />
      <div className="md:hidden pl-10 pb-10">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              type="button"
              className="w-full text-white font-clashdisplay_medium flex items-center gap-1 ml-2"
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
