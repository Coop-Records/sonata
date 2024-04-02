import { maxUint256 } from 'viem';
import getAdminMintCall from './getAdminMintCall';
import getCallSaleCall from './getCallSaleCall';
import getMinterPermissionCall from './getMinterPermissionCall';
import getSetSaleCall from './getSetSaleCall';
import getSetupNewTokenCall from './getSetupNewTokenCall';
import getUpdateRoyaltiesForTokenCall from './getUpdateRoyaltiesForTokenCall';
import getUpdateTokenURICall from './getUpdateTokenURICall';

const getSetupActions = ({
  uri = '',
  fundsRecipient,
  fixedPriceSaleStrategy,
  maxSupply = maxUint256,
}: {
  uri?: string;
  fundsRecipient: `0x${string}`;
  fixedPriceSaleStrategy: `0x${string}`;
  maxSupply?: bigint;
}) => {
  const tokenId = 1n;
  const updateTokenURICall = getUpdateTokenURICall(tokenId, uri);
  const updateRoyaltiesForTokenCall = getUpdateRoyaltiesForTokenCall(tokenId, fundsRecipient);
  const minterPermissionCall = getMinterPermissionCall(tokenId, fixedPriceSaleStrategy);
  const setupNewTokenCall = getSetupNewTokenCall(uri, maxSupply);
  const setSaleCall = getSetSaleCall(tokenId, fundsRecipient);
  const callSaleCall = getCallSaleCall(tokenId, fixedPriceSaleStrategy, setSaleCall);
  const adminMintCall = getAdminMintCall(tokenId, fundsRecipient);
  return [
    updateTokenURICall,
    setupNewTokenCall,
    updateRoyaltiesForTokenCall,
    minterPermissionCall,
    callSaleCall,
    adminMintCall,
  ];
};

export default getSetupActions;
