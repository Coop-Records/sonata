'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePrivy } from '@privy-io/react-auth';

const SignInButton = () => {
  const { login } = usePrivy();

  return (
    <Button
      onClick={login}
      className="flex h-auto items-center gap-1 rounded-md bg-farcaster px-4 py-2 font-light text-white md:gap-2 "
    >
      <div className="w-4 md:w-8">
        <Image src="/images/farcaster.svg" width={323} height={297} alt="" />
      </div>
      <span className="max-md:text-xs"> Sign In</span>
    </Button>
  );
};

export default SignInButton;
