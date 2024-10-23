'use client';
import { Button } from '@/components/ui/button';
import { usePrivy } from '@privy-io/react-auth';

const SignInButton = () => {
  const { login } = usePrivy();

  return (
    <Button
      onClick={login}
      className="h-auto rounded-full bg-blue px-6 py-3 font-sora font-medium text-white"
    >
      Sign-In
    </Button>
  );
};

export default SignInButton;
