import { useNeynarProvider } from '@/providers/NeynarProvider';
import Image from 'next/image';

const SignInButton = () => {
  const { signIn, signOut, user } = useNeynarProvider();

  return (
    <button
      onClick={user ? signOut : signIn}
      className="rounded-md bg-black text-white py-2 px-4 flex gap-2 items-center font-light"
    >
      {user ? (
        'Logout'
      ) : (
        <>
          <Image src="/images/warpcast.png" width={32} height={32} alt="" />
          Sign In
        </>
      )}
    </button>
  );
};

export default SignInButton;
