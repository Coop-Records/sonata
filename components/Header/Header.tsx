'use client';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import SignInButton from '../SignInButton';
import Title from './Title';
import UserMenu from './UserMenu';
import CreatePostButton from './CreatePostButton';
import BalanceInfo from './BalanceInfo';

export default function Header() {
  const { user } = useNeynarProvider();
  return (
    <div className="container flex items-center justify-between py-4">
      <Title />
      {user ? (
        <div className="flex gap-2">
          <BalanceInfo />
          <CreatePostButton />
          <UserMenu />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
