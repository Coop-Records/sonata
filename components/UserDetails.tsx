import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

export default function UserDetails({ user, className }: { user: User; className?: string }) {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <Avatar className="size-8">
        <AvatarImage src={user.pfp_url} />
        <AvatarFallback>{user.display_name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-none">{user.display_name}</span>
        <a href={`https://warpcast.com/${user.username}`} target="_blank">
          <span className="text-xs text-muted-foreground hover:underline">@{user.username}</span>
        </a>
      </div>
    </div>
  );
}
