import Zora1155 from '@/abis/zora1155.json';
import { ICastsAndContracts } from '@/types/ContractCastMap';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { ZoraChains } from '../consts';
import parseCollectionUrl, { pattern as collectionUrlPattern } from './parseCollectionUrl';

function getCastContractMapping(casts: Cast[]) {
  const castContractMappings: { [Key in ZoraChains]?: ICastsAndContracts } = {} as any;

  for (const cast of casts) {
    const embed = cast.embeds.find((embed: any) => collectionUrlPattern.test(embed?.url));
    if (!embed) continue;

    const collectionData = parseCollectionUrl((embed as any).url);
    if (!collectionData) continue;

    const { chain } = collectionData;

    const contract = {
      address: collectionData.collectionAddress,
      abi: Zora1155,
      functionName: 'uri',
      args: [collectionData.tokenId]
    };

    const placeholder = castContractMappings[chain] ?? { casts: [], contracts: [] };

    placeholder.casts.push(cast);
    placeholder.contracts.push(contract);

    castContractMappings[chain] = placeholder;
  }

  return castContractMappings;
}

export default getCastContractMapping;