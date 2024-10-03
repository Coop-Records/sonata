import { LinkedAccountWithMetadata } from '@privy-io/server-auth';

const extractAddresses = (linkedAccounts: LinkedAccountWithMetadata[]) => {
  return linkedAccounts.reduce((previous, account) => {
    if (account.type === 'wallet') previous.push(account.address);
    return previous;
  }, [] as string[]);
};

export default extractAddresses;
