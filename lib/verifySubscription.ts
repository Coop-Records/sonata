import { Address } from 'viem';
import { HYPERSUB_SUBSCRIPTION_ADDRESS } from './consts';
import { getPublicClient } from './viem';
import { base } from 'viem/chains';

async function verifySubscription(address: Address) {
  const client = getPublicClient(base.id);

  const result = await client.readContract({
    functionName: 'balanceOf',
    address: HYPERSUB_SUBSCRIPTION_ADDRESS,
    args: [address],
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'numSeconds',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  });

  return result > 0;
}

export default verifySubscription;
