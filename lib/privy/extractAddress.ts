
const extractAddress = (linkedAccounts: any[]) => {
  return linkedAccounts.reduce(
    (previous, account) => {
      if (account.type === 'wallet') previous.push(account.address);
      return previous;
    }, [] as string[]
  );
};

export default extractAddress;
