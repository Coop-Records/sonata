import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Button } from '../ui/button';
import ConnectButton from '../ConnectButton';
import { usePrivy } from '@privy-io/react-auth';

const CollectButton = () => {
  const { collection } = useSongPageProvider();
  const { authenticated } = usePrivy();

  if (!authenticated) return <ConnectButton />;

  return <Button onClick={() => window.open(collection?.zora, '_blank')}>Buy on Zora</Button>;
};

export default CollectButton;
