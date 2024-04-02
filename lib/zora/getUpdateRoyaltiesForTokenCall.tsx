import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';

import { encodeFunctionData } from 'viem';

const getUpdateRoyaltiesForTokenCall = (tokenId: bigint, fundsRecipient: `0x${string}`) =>
  encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: 'updateRoyaltiesForToken',
    args: [
      tokenId,
      {
        royaltyMintSchedule: 0,
        royaltyBPS: 500,
        royaltyRecipient: fundsRecipient,
      },
    ],
  });

export default getUpdateRoyaltiesForTokenCall;
