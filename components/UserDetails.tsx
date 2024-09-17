import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn, timeFromNow } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { SupabasePost } from '@/types/SupabasePost';
import { SupabaseUser } from '@/types/SupabaseUser';

export default function UserDetails({
  user,
  className,
  createdAt,
}: {
  user: SupabaseUser;
  className?: string;
  createdAt?: SupabasePost['created_at'];
}) {
  return (
    <div className={cn('flex space-x-2 items-center', className)}>
      <Link href={`/${user.username}`}>
        <Avatar className="size-4">
          <AvatarImage src={user.pfp_url} />
          <AvatarFallback>{user.display_name}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-1 text-grey text-[10px]">
          <a href={`/${user.username}`} target="_blank" className="leading-none flex gap-1">
            <p className="truncate max-w-[50px]">{user.display_name}</p> posted
          </a>
          {user.power_badge && <Image src="/images/hypersub.png" width={20} height={20} alt="" />}
          {createdAt && (
            <span className="leading-none">
              {'• '}
              {timeFromNow(createdAt)} ago
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
