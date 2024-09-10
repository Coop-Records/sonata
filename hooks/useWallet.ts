import { CHAIN } from '@/lib/consts';
import { useWallets } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Address, createWalletClient, custom, WalletClient } from 'viem';

export default function useWalletClient() {
  const { wallets, ready } = useWallets();
  const wallet = wallets[0];
  const [walletClient, setWalletClient] = useState<WalletClient>();
  const [address, setAddress] = useState<Address>();
  useEffect(() => {
    const createWallet = async () => {
      if (!ready || !wallet) return;
      await wallet.switchChain(CHAIN.id);
      const provider = await wallet.getEthereumProvider();
      const walletClient = createWalletClient({
        chain: CHAIN,
        transport: custom(provider),
      });
      setWalletClient(walletClient);
      const addresses = await walletClient.getAddresses();
      const address = addresses[0];
      setAddress(address);
    };

    createWallet();
  }, [wallet, ready]);

  return { address, walletClient, loading: !ready };
}
