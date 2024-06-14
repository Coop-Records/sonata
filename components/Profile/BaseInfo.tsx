import { useProfileProvider } from '@/providers/ProfileProvider';
import { Avatar, AvatarImage } from '../ui/avatar';
import Image from 'next/image';

const BaseInfo = () => {
  const { profile } = useProfileProvider();

  return (
    <div className="flex gap-2 items-center">
      <Avatar className="w-[60px] h-[60px]">
        <AvatarImage src={profile?.pfp.url} />
      </Avatar>
      <div className="space-y-1">
        <p className="font-sora text-[21px] font-semibold">{profile?.displayName}</p>
        <div className="flex gap-2">
          <div className="bg-grey-light px-4 h-[33px] flex items-center justify-center rounded-full text-[14px] font-sora font-semibold">
            #{profile?.fid}
          </div>
          <div className="bg-purple-light px-4 h-[33px] flex items-center justify-center gap-1 rounded-full text-[14px] font-sora font-semibold">
            <Image src="/images/neynar.svg" alt="warpcast" width={16} height={14} />
            <p className="text-purple">{profile?.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
