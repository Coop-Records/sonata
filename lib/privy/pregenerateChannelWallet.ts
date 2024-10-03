'use server';
import getPrivyIdentifier from './getIdentifier';
import privyClient from './privyClient';

async function pregenerateChannelWallet(channelId: string) {
  const user = await privyClient.importUser({
    createEthereumWallet: true,
    linkedAccounts: [
      {
        address: getPrivyIdentifier(channelId),
        type: 'email',
      },
    ],
  });

  return user;
}

export default pregenerateChannelWallet;
