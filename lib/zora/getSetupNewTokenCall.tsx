import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';

import { encodeFunctionData } from 'viem';

const getSetupNewTokenCall = (uri: string, maxSupply: bigint) =>
  encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: 'setupNewToken',
    args: [uri, maxSupply],
  });

export default getSetupNewTokenCall;
