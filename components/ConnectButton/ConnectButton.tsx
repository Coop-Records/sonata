import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../ui/button';

const ConnectButton = () => {
  const { login, ready, authenticated } = usePrivy();

  if (!ready) return null;

  if (authenticated) {
    return (
      <Button disabled className="bg-green !w-[186px] !rounded-full">
        Connected
      </Button>
    );
  }

  return (
    <Button onClick={login} className="bg-green !w-[186px] !rounded-full">
      Connect
    </Button>
  );
};

export default ConnectButton;
