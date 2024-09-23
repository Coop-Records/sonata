'use client';
import { Button } from '@/components/ui/button';
import { usePrivy } from '@privy-io/react-auth';

const SignInButton = () => {
  const { connectWallet } = usePrivy();

  return (
    <Button
      onClick={connectWallet}
      className="h-auto rounded-full bg-blue px-6 py-3 font-medium text-white font-sora"
    >
      Sign-In
    </Button>
  );
};

export default SignInButton;
