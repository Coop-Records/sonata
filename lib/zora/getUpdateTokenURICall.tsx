import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';

import { encodeFunctionData } from 'viem';

const getUpdateTokenURICall = (tokenId: bigint, uri: string) =>
  encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: 'updateTokenURI',
    args: [tokenId, uri],
  });

export default getUpdateTokenURICall;
