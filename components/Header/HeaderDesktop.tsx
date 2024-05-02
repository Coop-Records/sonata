'use client';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import SignInButton from '../SignInButton';
import Title from './Title';
import UserMenu from './UserMenu';
import CreatePostButton from './CreatePostButton';
import BalanceInfo from './BalanceInfo';
import { cn } from '@/lib/utils';

export default function HeaderDesktop({ className }: { className?: string }) {
  const { user } = useNeynarProvider();

  return (
    <div className={cn('w-full flex items-center gap-4 py-4', className)}>
      <Title className="mr-auto" />
      {user ? (
        <div className="flex gap-2">
          <div className="max-md:hidden">
            <BalanceInfo />
          </div>
          <CreatePostButton />
          <UserMenu />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
