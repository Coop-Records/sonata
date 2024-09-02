import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../ui/button';

const ConnectButton = () => {
  const { login, ready, authenticated } = usePrivy();

  if (!ready) return null;

  if (authenticated) {
    return <Button disabled>Connected</Button>;
  }

  return <Button onClick={login}>Connect Wallet</Button>;
};

export default ConnectButton;
