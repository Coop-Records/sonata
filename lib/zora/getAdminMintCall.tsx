import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';

import { encodeFunctionData, toHex } from 'viem';

const getAdminMintCall = (tokenId: bigint, fundsRecipient: `0x${string}`) =>
  encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: 'adminMint',
    args: [fundsRecipient, tokenId, 1n, toHex('')],
  });

export default getAdminMintCall;
