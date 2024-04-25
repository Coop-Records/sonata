import { useNeynarProvider } from '@/providers/NeynarProvider';
import Image from 'next/image';

const SignInButton = () => {
  const { signIn, signOut, user } = useNeynarProvider();

  return (
    <button
      onClick={user ? signOut : signIn}
      className="rounded-md bg-farcaster text-white py-2 px-4 flex gap-2 items-center font-light"
    >
      {user ? (
        'Logout'
      ) : (
        <>
          <div className="w-8">
            <Image src="/images/farcaster.svg" width={323} height={297} alt="" />
          </div>
          Sign In
        </>
      )}
    </button>
  );
};

export default SignInButton;
