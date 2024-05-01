'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useNeynarProvider } from '@/providers/NeynarProvider';
import { ExitIcon } from '@radix-ui/react-icons';

export default function UserMenu() {
  const { user, signOut } = useNeynarProvider();

  if (!user) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.pfp_url} />
          <AvatarFallback>{user.display_name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 min-w-52" alignOffset={100}>
        <DropdownMenuLabel className="cursor-default">{user.display_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Log out
          <ExitIcon className="ml-2 size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
