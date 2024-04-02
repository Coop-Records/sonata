import { zoraCreatorFixedPriceSaleStrategyABI } from '@zoralabs/protocol-deployments';

import { encodeFunctionData, maxUint64 } from 'viem';

const getSetSaleCall = (tokenId: bigint, fundsRecipient: `0x${string}`) =>
  encodeFunctionData({
    abi: zoraCreatorFixedPriceSaleStrategyABI,
    functionName: `setSale`,
    args: [
      tokenId,
      {
        saleStart: 0n,
        saleEnd: maxUint64,
        maxTokensPerAddress: 0n,
        pricePerToken: 0n,
        fundsRecipient,
      },
    ],
  });

export default getSetSaleCall;
