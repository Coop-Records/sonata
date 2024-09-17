import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../ui/button';
import useWalletClient from '@/hooks/useWalletClient';

const ConnectButton = () => {
  const { ready, connectWallet } = usePrivy();
  const { address } = useWalletClient();
  if (!ready) return null;

  if (address) {
    return <Button disabled>Connected</Button>;
  }

  return <Button onClick={connectWallet}>Connect</Button>;
};

export default ConnectButton;
