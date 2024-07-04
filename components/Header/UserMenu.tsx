'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNeynarProvider } from '@/providers/NeynarProvider';

export default function UserMenu() {
  const { user, signOut } = useNeynarProvider();

  if (!user) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage className="object-cover object-center" src={user?.pfp_url} />
          <AvatarFallback>{user?.display_name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 min-w-52" alignOffset={100}>
        <a href={`/${user?.username}`}>
          <DropdownMenuItem className="cursor-pointer">{user?.display_name} </DropdownMenuItem>
        </a>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
