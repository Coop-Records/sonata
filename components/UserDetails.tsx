import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn, timeFromNow } from '@/lib/utils';
import Link from 'next/link';
import { SupabasePost } from '@/types/SupabasePost';
import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';

export default function UserDetails({
  user,
  className,
  createdAt,
}: {
  user: User;
  className?: string;
  createdAt?: SupabasePost['created_at'];
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
        <div className="flex flex-row items-center gap-1 align-middle">
          <a
            href={`/${user.username}`}
            target="_blank"
            className="text-sm font-semibold leading-none"
          >
            {user.display_name}
          </a>
          {createdAt && (
            <span className="text-sm leading-none text-muted-foreground">
              {'• '}
              {timeFromNow(createdAt)}
            </span>
          )}
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
