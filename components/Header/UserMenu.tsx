'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserProvider } from '@/providers/UserProvider';
import { useUi } from '@/providers/UiProvider';

export default function UserMenu() {
  const { user } = useUserProvider();

  const { setMenuOpen } = useUi();
  if (!user) return <></>;

  return (
    <button type="button" onClick={() => setMenuOpen(true)}>
      <Avatar className="size-9 cursor-pointer">
        <AvatarImage className="object-cover object-center" src={user?.pfp_url} />
        <AvatarFallback>{user?.display_name?.[0]}</AvatarFallback>
      </Avatar>
    </button>
  );
}
