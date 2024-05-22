'use client';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const SignInButton = () => {
  const { signIn } = useNeynarProvider();

  return (
    <Button
      onClick={signIn}
      className="flex h-auto items-center gap-2 rounded-md bg-farcaster px-4 py-2 font-light text-white"
    >
      <div className="w-6 md:w-8">
        <Image src="/images/farcaster.svg" width={323} height={297} alt="" />
      </div>
      Sign In
    </Button>
  );
};

export default SignInButton;
