'use client';
import { usePrivy } from '@privy-io/react-auth';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

type UserAvatarProps = {
  onClick?: () => void;
};

const UserAvatar = ({ onClick }: UserAvatarProps) => {
  const { user } = usePrivy();

  return (
    <Avatar className="size-8" onClick={onClick}>
      {user?.farcaster?.pfp ? (
        <AvatarImage src={user.farcaster.pfp} alt="User Avatar" />
      ) : (
        <AvatarFallback>{user?.farcaster?.displayName?.[0] || 'User'}</AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
