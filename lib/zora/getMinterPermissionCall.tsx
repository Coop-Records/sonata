import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments';

import { encodeFunctionData } from 'viem';

const MINTER_PERMISSION_BITS = 4n;

const getMinterPermissionCall = (tokenId: bigint, minter: `0x${string}`) =>
  encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: 'addPermission',
    args: [tokenId, minter, MINTER_PERMISSION_BITS],
  });

export default getMinterPermissionCall;
