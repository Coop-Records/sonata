import { useProfileProvider } from '@/providers/ProfileProvider';
import Image from 'next/image';

const Followers = () => {
  const { followers } = useProfileProvider();

  const follower1st = followers.length >= 1 ? followers[0] : null;
  const follower2nd = followers.length >= 2 ? followers[1] : null;
  const follower3rd = followers.length >= 3 ? followers[2] : null;

  return (
    <div className="flex gap-1">
      <div className="flex">
        {follower1st && (
          <Image
            src={follower1st.pfp_url}
            width={24}
            height={24}
            alt={follower1st.username}
            className="max-h-6 min-h-6 min-w-6 max-w-6 overflow-hidden  rounded-full object-cover"
          />
        )}
        {follower2nd && (
          <Image
            src={follower2nd.pfp_url}
            width={24}
            height={24}
            alt={follower2nd.username}
            className="max-h-6 min-h-6 min-w-6 max-w-6 translate-x-[-8px] overflow-hidden  rounded-full object-cover"
          />
        )}
        {follower3rd && (
          <Image
            src={follower3rd.pfp_url}
            width={24}
            height={24}
            alt={follower3rd.username}
            className="max-h-6 min-h-6 min-w-6 max-w-6 translate-x-[-16px] overflow-hidden  rounded-full object-cover"
          />
        )}
      </div>
      <p className="flex translate-x-[-12px] items-center text-[14px] leading-none text-grey">
        Followed by {follower1st && `@${follower1st.username},`}
        {follower2nd && ` @${follower2nd.username},`}
        {follower3rd && ` @${follower3rd.username}`} and {`${followers.length}`} more friends.
      </p>
    </div>
  );
};

export default Followers;
