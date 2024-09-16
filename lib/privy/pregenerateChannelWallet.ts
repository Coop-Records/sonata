import { PrivyUser } from '@/types/Privy';
import getPrivyIdentifier from './getIdentifier';
import privyClient from './privyClient';

async function pregenerateChannelWallet(channelId: string): Promise<PrivyUser> {
  const body = {
    create_embedded_wallet: true,
    linked_accounts: [
      {
        address: getPrivyIdentifier(channelId),
        type: 'email',
      },
    ],
  };

  const response = await privyClient('/users', { body });
  if (!response.ok) throw Error(response.statusText);

  return await response.json();
}

export default pregenerateChannelWallet;
