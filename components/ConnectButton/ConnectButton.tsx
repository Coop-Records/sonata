import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../ui/button';
import useWalletClient from '@/hooks/useWalletClient';

const ConnectButton = () => {
  const { ready, connectWallet } = usePrivy();
  const { address } = useWalletClient();
  if (!ready) return null;

  if (address) {
    return (
      <Button disabled className="bg-green !w-[186px] !rounded-full">
        Connected
      </Button>
    );
  }

  return (
    <Button onClick={connectWallet} className="bg-green !w-[186px] !rounded-full">
      Connect
    </Button>
  );
};

export default ConnectButton;
