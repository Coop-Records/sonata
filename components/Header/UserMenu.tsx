'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import UserAvatar from '@/components/UserAvatar';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { user, logout } = usePrivy();

  const router = useRouter();
  if (!user) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar
          onClick={() => {
            router.push(`/${user?.farcaster?.username}`);
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 min-w-52" alignOffset={100}>
        <Link href={`/${user?.farcaster?.username}`}>
          <DropdownMenuItem className="cursor-pointer">
            {user?.farcaster?.displayName}{' '}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
