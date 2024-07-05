import getPrivyIdentifier from "./getIdentifier";
import privyClient from "./privyClient";

function pregenerateChannelWallet(channelId: string) {
  const body = {
    create_embedded_wallet: true,
    linked_accounts: [
      {
        address: getPrivyIdentifier(channelId),
        type: "email"
      }
    ],
  };

  return privyClient('/users', { body });
};

export default pregenerateChannelWallet;
