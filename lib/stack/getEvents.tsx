import { stack } from '@/lib/stack/client';
import { Address } from 'viem';

const getEvents = async (address: Address, event: string) => {
  const response = await stack.getEvents({
    address,
    event,
  });
  return response;
};

export default getEvents;
