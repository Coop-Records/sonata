import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function UserDetails({
  user,
  hasHypersub,
  className,
}: {
  user: User;
  hasHypersub?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex space-x-3', className)}>
      <Link href={`/${user.username}`}>
        <Avatar className="size-8">
          <AvatarImage src={user.pfp_url} />
          <AvatarFallback>{user.display_name}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center align-middle">
          <a
            href={`/${user.username}`}
            target="_blank"
            className="text-sm font-semibold leading-none"
          >
            {user.display_name}
          </a>
          {hasHypersub && <Image src="/images/hypersub.png" width={20} height={20} alt="" />}
        </div>
        <a
          href={`/${user.username}`}
          target="_blank"
          className="text-xs leading-none text-muted-foreground hover:underline"
        >
          @{user.username}
        </a>
      </div>
    </div>
  );
}
