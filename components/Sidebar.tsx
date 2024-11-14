'use client';
import SignInButton from '@/components/SignInButton';
import { Separator } from '@/components/ui/separator';
import ChannelFilter from '@/components/Feed/ChannelFilter';
import Image from 'next/image';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import UserAvatar from '@/components/UserAvatar';
import { useUi } from '@/providers/UiProvider';
import { ExitIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';

export default function Sidebar({
  isSingleCast = false,
  className,
}: {
  isSingleCast?: boolean;
  className?: string;
}) {
  const { isMobile, menuOpen, setMenuOpen } = useUi();
  return isMobile ? (
    <nav className={className}>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left">
          <SidebarContent isSingleCast={isSingleCast} />
        </SheetContent>
      </Sheet>
    </nav>
  ) : (
    <nav className={className}>
      <SidebarContent />
    </nav>
  );
}

const SidebarContent = ({ isSingleCast = false }: { isSingleCast?: boolean }) => {
  const { isMobile, setMenuOpen } = useUi();
  const router = useRouter();
  const { user } = usePrivy();

  const handleUserAvatarClick = () => {
    setMenuOpen(false);
    router.push(`/${user?.farcaster?.username}`);
  };

  return (
    <div className="flex h-full flex-col gap-6 md:px-16 md:py-6">
      {isMobile ? (
        <div className="flex items-center justify-between">
          <UserAvatar className="size-9" onClick={handleUserAvatarClick} />
          <X className="size-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>
      ) : (
        <Link href="/" className="mb-8 flex items-center gap-2">
          <Image src="/images/notes.png" width={20} height={20} alt="" />
          <span className="font-clashDisplay font-semibold">Sonata</span>
        </Link>
      )}
      <Separator />

      {!isSingleCast && <ChannelFilter />}
      {isMobile && <AuthButton />}
    </div>
  );
};

const AuthButton = () => {
  const { authenticated, logout } = usePrivy();
  return authenticated ? (
    <button onClick={logout} className="flex items-center gap-2">
      <span className="font-clashDisplay font-semibold">Logout</span>
      <ExitIcon className="size-4" />
    </button>
  ) : (
    <SignInButton />
  );
};
