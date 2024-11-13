'use client';
import { usePrivy } from '@privy-io/react-auth';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type UserAvatarProps = {
  onClick?: () => void;
  className?: string;
};

const UserAvatar = ({ onClick, className }: UserAvatarProps) => {
  const { user } = usePrivy();

  return (
    <Link href={`/${user?.farcaster?.username}`}>
      <Avatar className={cn('size-8', className)} onClick={onClick}>
        {user?.farcaster?.pfp ? (
          <AvatarImage src={user.farcaster.pfp} alt="User Avatar" />
        ) : (
          <AvatarFallback>{user?.farcaster?.displayName?.[0] || 'User'}</AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
