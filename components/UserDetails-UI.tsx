import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';


export default function UserDetails({  className }: { user: User; className?: string }) {
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
        <div className='flex-padding flex flex-row'>
            <div className='padding rounded-full bg-muted text-center'>
            <span className='text-center text-xs'> #99</span>
            </div>
            <div className='padding custom-background flex flex-row rounded-full bg-farcaster '>
                <img src="/images/profile-vector.png" alt="" className='image-small' ></img>
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
