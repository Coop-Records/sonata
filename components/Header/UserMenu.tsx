'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';

export default function UserMenu() {
  const { user, logout } = usePrivy();
  if (!user) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage className="object-cover object-center" src={user?.farcaster?.pfp ?? ''} />
          <AvatarFallback>{user?.farcaster?.displayName?.[0]}</AvatarFallback>
        </Avatar>
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
