import { useProfileProvider } from '@/providers/ProfileProvider';
import { Avatar, AvatarImage } from '../ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import Rank from './Rank';

const BaseInfo = () => {
  const { profile } = useProfileProvider();
  const warpcastProfileURL = `https://warpcast.com/${profile?.username}`;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-[60px]">
        <AvatarImage className="object-cover" src={profile?.pfp.url} />
      </Avatar>
      <div className="space-y-1">
        <p className="font-sora text-[21px] font-semibold">{profile?.displayName}</p>
        <div className="flex gap-2">
          <Rank />
          <Link
            href={warpcastProfileURL}
            target="_blank"
            className="flex h-[33px] items-center justify-center gap-1 rounded-full bg-purple-light px-4 font-sora text-[14px] font-semibold"
          >
            <Image src="/images/neynar.svg" alt="warpcast" width={16} height={14} />
            <p className="text-purple">{profile?.username}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
