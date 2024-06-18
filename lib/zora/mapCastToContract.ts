import Zora1155 from '@/abis/zora1155.json';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Address } from 'viem';
import parseCollectionUrl, { pattern as collectionUrlPattern } from './parseCollectionUrl';

export interface IContract {
  address: Address,
  abi: any,
  functionName: string,
  args?: unknown[]
};

export interface ICastsAndContracts {
  contracts: IContract[],
  casts: Cast[],
};

function mapContractsToCasts(
  cast: Cast,
  contract: IContract,
  previous: ICastsAndContracts
) {
  previous.casts.push(cast);
  previous.contracts.push(contract);

  return previous;
}

function getCastContractMapping(casts: Cast[]) {
  let arbitrum: ICastsAndContracts = { casts: [], contracts: [] };
  let base: ICastsAndContracts = { casts: [], contracts: [] };
  let blast: ICastsAndContracts = { casts: [], contracts: [] };
  let mainnet: ICastsAndContracts = { casts: [], contracts: [] };
  let optimism: ICastsAndContracts = { casts: [], contracts: [] };
  let pgn: ICastsAndContracts = { casts: [], contracts: [] };
  let zora: ICastsAndContracts = { casts: [], contracts: [] };

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

    if (chain == 'arb') arbitrum = mapContractsToCasts(cast, contract, arbitrum);
    else if (chain == 'base') base = mapContractsToCasts(cast, contract, base);
    else if (chain == 'blast') blast = mapContractsToCasts(cast, contract, blast);
    else if (chain == 'eth') mainnet = mapContractsToCasts(cast, contract, mainnet);
    else if (chain == 'oeth') optimism = mapContractsToCasts(cast, contract, optimism);
    else if (chain == 'pgn') pgn = mapContractsToCasts(cast, contract, pgn);
    else if (chain == 'zora') zora = mapContractsToCasts(cast, contract, zora);
  }

  return {
    arbitrum,
    base,
    blast,
    mainnet,
    optimism,
    pgn,
    zora
  }
}

export default getCastContractMapping;