import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Address } from 'viem';

async function getBulkUsersByAddress(address: Address) {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  const queryParams = new URLSearchParams({
    addresses: address,
  });

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk-by-address?${queryParams}`,
    options,
  );

  const data = await response.json();
  if (data?.code === 'NotFound') return null;
  return data[address.toLowerCase()] as User[];
}

export default getBulkUsersByAddress;
