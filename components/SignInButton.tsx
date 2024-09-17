'use client';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Button } from '@/components/ui/button';

const SignInButton = () => {
  const { signIn } = useNeynarProvider();

  return (
    <Button
      onClick={signIn}
      className="h-auto rounded-full bg-blue px-6 py-3 font-medium text-white font-sora"
    >
      Sign-In
    </Button>
  );
};

export default SignInButton;
