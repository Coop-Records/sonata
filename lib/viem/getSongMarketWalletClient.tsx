import { Address, Chain, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const account = privateKeyToAccount(process.env.PRIVATE_KEY as Address);

const getSongMarketWalletClient = (chain: Chain) =>
  createWalletClient({
    account,
    chain,
    transport: http(),
  });

export default getSongMarketWalletClient;
