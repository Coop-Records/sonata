'use client';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Button } from '@/components/ui/button';

const SignInButton = () => {
  const { signIn } = useNeynarProvider();

  return (
    <Button
      onClick={signIn}
      className="h-auto rounded-full bg-blue px-4 py-2 font-light text-white"
    >
      Sign-In
    </Button>
  );
};

export default SignInButton;
