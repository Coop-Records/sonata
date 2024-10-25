import { useProfileProvider } from '@/providers/ProfileProvider';
import { Avatar, AvatarImage } from '../ui/avatar';
import Link from 'next/link';

const BaseInfo = () => {
  const { profile } = useProfileProvider();
  const warpcastProfileURL = `https://warpcast.com/${profile?.username}`;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-[60px]">
        <AvatarImage className="object-cover" src={profile?.pfp_url} />
      </Avatar>
      <div className="space-y-1">
        <p className="font-clashDisplay font-medium">{profile?.display_name}</p>
        <Link href={warpcastProfileURL} target="_blank" className="font-sora text-sm text-grey">
          {'@'}
          {profile?.username}
        </Link>
        <p className="mt-2 font-sora text-sm text-grey">{profile?.profile.bio.text}</p>
      </div>
    </div>
  );
};

export default BaseInfo;
