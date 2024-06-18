import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Avatar, AvatarImage } from '../ui/avatar';
import Image from 'next/image';
import Link from 'next/link';

const BaseInfo = ({
    profile,
   
  }: {
    profile: User;
    
  }) => {
  
  const warpcastProfileURL = `https://warpcast.com/${profile?.username}`

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-8">
        <AvatarImage className='object-cover' src={profile?.pfp_url} />
      </Avatar>
      <div className="space-y-1">
        
        <div className="flex gap-2">
          <div className="flex h-[33px] items-center justify-center rounded-full bg-grey-light px-4 font-sora text-[14px] font-semibold">
            #{profile?.fid}
          </div>
          <Link href={warpcastProfileURL} target='_blank' className="flex h-[33px] items-center justify-center gap-1 rounded-full bg-purple-light px-4 font-sora text-[14px] font-semibold">
            <Image src="/images/neynar.svg" alt="warpcast" width={16} height={14} />
            <p className="text-purple">{profile?.username}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
