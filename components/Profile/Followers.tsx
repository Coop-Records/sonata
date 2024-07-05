import { useProfileProvider } from '@/providers/ProfileProvider';
import clsx from 'clsx';
import Image from 'next/image';

const Followers = () => {
  const { followers, profile } = useProfileProvider();

  return (
    <div className="flex gap-1">
      <div className="flex">
        {followers.map((follower, i) => (
          <Image
            key={follower.fid}
            src={follower.pfp_url}
            width={24}
            height={24}
            alt={follower.username}
            className={clsx('max-h-6 min-h-6 min-w-6 max-w-6 overflow-hidden rounded-full object-cover', {
              'translate-x-[-8px]': i == 1,
              'translate-x-[-16px]': i == 2,
            })}
          />
        ))}
      </div>
      <p className="flex translate-x-[-12px] items-center text-[14px] leading-none text-grey">
        Followed by {followers.map(follower => '@' + follower.username).join(', ')} and {`${(profile?.followerCount ?? 0) - followers.length}`} more friends.
      </p>
    </div>
  );
};

export default Followers;
