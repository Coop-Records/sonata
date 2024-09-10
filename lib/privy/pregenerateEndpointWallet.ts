import getIdentifier from './getIdentifier';
import privyClient from './privyClient';

function pregenerateEndpointWallet(endpoint: string) {
  const body = {
    create_embedded_wallet: true,
    linked_accounts: [
      {
        address: getIdentifier(endpoint),
        type: 'email',
      },
    ],
  };

  return privyClient('/users', { body });
}

export default pregenerateEndpointWallet;
