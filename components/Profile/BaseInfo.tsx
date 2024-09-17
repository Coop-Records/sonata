import { useProfileProvider } from '@/providers/ProfileProvider';
import { Avatar, AvatarImage } from '../ui/avatar';
import Link from 'next/link';

const BaseInfo = () => {
  const { profile } = useProfileProvider();
  const warpcastProfileURL = `https://warpcast.com/${profile?.username}`;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-[72px]">
        <AvatarImage className="object-cover" src={profile?.pfp.url} />
      </Avatar>
      <div className="space-y-1">
        <p className="font-clashdisplay_medium text-white text-md">{profile?.displayName}</p>
        <div className="flex gap-2">
          <Link href={warpcastProfileURL} target="_blank" className="text-grey font-sora text-sm">
            <p>@{profile?.username}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
