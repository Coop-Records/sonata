import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';

import { encodeFunctionData } from 'viem';

const getCallSaleCall = (tokenId: bigint, minter: `0x${string}`, setSaleCall: `0x${string}`) =>
  encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: 'callSale',
    args: [tokenId, minter, setSaleCall],
  });

export default getCallSaleCall;
