'use client';

import { useNeynarProvider } from '@/providers/NeynarProvider';
import SignInButton from '../SignInButton';
import Title from './Title';
import { cn } from '@/lib/utils';
import SignedInSection from './SignedInSection';

export default function HeaderDesktop({ className }: { className?: string }) {
  const { user } = useNeynarProvider();

  return (
    <div className={cn('w-full flex items-center gap-4 py-4', className)}>
      <div className="mr-auto">
        <Title />
      </div>
      {user ? <SignedInSection /> : <SignInButton />}
    </div>
  );
}
