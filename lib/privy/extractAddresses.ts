import { PrivyLinkedAccount } from "@/types/Privy";

const extractAddresses = (linkedAccounts: PrivyLinkedAccount[]) => {
  return linkedAccounts.reduce(
    (previous, account) => {
      if (account.type === 'wallet') previous.push(account.address);
      return previous;
    }, [] as string[]
  );
};

export default extractAddresses;
