import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';


export default function UserDetails({ user, className }: { user: User; className?: string }) {
  const profileUrl = `https://warpcast.com/test`;
  return (
    <div className={cn('flex space-x-3', className)}>
      <a href={profileUrl} target="_blank">
        <Avatar className="size-full">
          <AvatarImage src="/images/Ellipse_63.png" />
          <AvatarFallback>Akhil</AvatarFallback>
        </Avatar>
      </a>
      <div className="flex flex-col gap-1">
        
        <a href={profileUrl} target="_blank" className="text-sm font-semibold leading-none">
        Akhil
        </a>
        <div className='flex flex-padding flex-row'>
            <div className='bg-muted rounded-full padding text-center'>
            <span className='text-xs text-center'> #99</span>
            </div>
            <div className='bg-farcaster padding flex custom-background flex-row rounded-full '>
                <img src="/images/profile-vector.png" className='image-small' ></img>
            akhil-bvs
            </div>
        </div>
        {/* <a
          href={profileUrl}
          target="_blank"
          className="text-xs leading-none text-muted-foreground hover:underline"
        >
          @Akhil
        </a> */}
      </div>
    </div>

    
  );
}
