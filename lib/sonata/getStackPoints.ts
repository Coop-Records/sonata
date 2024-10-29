import { stack } from '../stack/client';

async function getStackPoints(addresses: string[] | string, event?: string) {
  const balances = await stack.getPoints(addresses, event ? { event } : undefined);

  if (!balances) return 0;
  if (typeof balances === 'number') return balances;

  return balances.reduce((prev, curr) => prev + curr.amount, 0);
}

export default getStackPoints;
