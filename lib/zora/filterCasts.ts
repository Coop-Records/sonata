import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { createPublicClient, http, Address } from 'viem';
import * as chains from 'viem/chains';


interface IContract {
  address: Address,
  abi: any,
  functionName: string,
  args?: unknown[]
};

interface ICastsAndContracts {
  contracts: IContract[],
  casts: Cast[],
};

const GET_TOKEN_URI_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "uri",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function parseCollectionUrl(input: string) {
  // ...collect/{chain}:{collectionaddress}/{tokenId}...
  const match = input.match(/collect\/([^:]+):([^/]+)\/(\d+)/);

  if (!match) return null;

  return {
    chain: match[1],
    collectionAddress: match[2] as Address,
    tokenId: match[3]
  };
}

function mapContractsToCasts(
  cast: Cast,
  contract: IContract,
  previous: ICastsAndContracts
) {
  previous.casts.push(cast);
  previous.contracts.push(contract);

  return previous;
}

async function multicallToCasts(
  { chain, contracts, casts }: ICastsAndContracts & { chain: chains.Chain }
) {
  const responses = await createPublicClient({ chain, transport: http() }).multicall({ contracts });

  return responses.reduce<
    (Cast & { ipfs: string })[]
  >((prev, res, index) => {
    if (res.status === 'success' && typeof res.result === 'string') {
      prev.push({
        ...casts[index],
        ipfs: res.result.replace(':/', '')
      })
    }
    return prev;
  }, []);
}

async function filterZoraFeed(casts: Cast[]) {
  let arbitrum: ICastsAndContracts = { casts: [], contracts: [] };
  let base: ICastsAndContracts = { casts: [], contracts: [] };
  let blast: ICastsAndContracts = { casts: [], contracts: [] };
  let mainnet: ICastsAndContracts = { casts: [], contracts: [] };
  let optimism: ICastsAndContracts = { casts: [], contracts: [] };
  let pgn: ICastsAndContracts = { casts: [], contracts: [] };
  let zora: ICastsAndContracts = { casts: [], contracts: [] };

  for (const cast of casts) {
    for (const embed of cast.embeds) {
      const url = (embed as any)?.url as string | undefined;
      if (!url) continue;

      const collectionData = parseCollectionUrl(url);
      if (!collectionData) continue;

      const { chain } = collectionData;

      const contract = {
        address: collectionData.collectionAddress,
        abi: GET_TOKEN_URI_ABI as any,
        functionName: 'uri', // tokenURI
        args: [collectionData.tokenId]
      };

      if (chain == 'arb') arbitrum = mapContractsToCasts(cast, contract, arbitrum);
      else if (chain == 'base') base = mapContractsToCasts(cast, contract, base);
      else if (chain == 'blast') blast = mapContractsToCasts(cast, contract, blast);
      else if (chain == 'eth') mainnet = mapContractsToCasts(cast, contract, mainnet);
      else if (chain == 'oeth') optimism = mapContractsToCasts(cast, contract, optimism);
      else if (chain == 'pgn') pgn = mapContractsToCasts(cast, contract, pgn);
      else if (chain == 'zora') zora = mapContractsToCasts(cast, contract, zora);

      break;
    }
  }

  try {
    const data = [];

    if (arbitrum.contracts.length) data.push(...await multicallToCasts({ chain: chains.arbitrum, ...arbitrum }));
    if (base.contracts.length) data.push(...await multicallToCasts({ chain: chains.base, ...base }));
    if (blast.contracts.length) data.push(...await multicallToCasts({ chain: chains.blast, ...blast }));
    if (mainnet.contracts.length) data.push(...await multicallToCasts({ chain: chains.mainnet, ...mainnet }));
    if (optimism.contracts.length) data.push(...await multicallToCasts({ chain: chains.optimism, ...optimism }));
    if (pgn.contracts.length) data.push(...await multicallToCasts({ chain: chains.pgn, ...pgn }));
    if (zora.contracts.length) data.push(...await multicallToCasts({ chain: chains.zora, ...zora }));

    // https://gateway.pinata.cloud/ipfs/{key}
    const castsMetaData = await Promise.all(data.map(cast => (
      fetch(`https://gateway.pinata.cloud/${cast.ipfs}`, { cache: 'force-cache' })
    )));

    const response: Cast[] = [];

    for (let index = 0; index < data.length; index++) {
      const cast = data[index];

      const metadata: {
        content?: {
          mime?: string;
          uri?: string
        }
      } = await castsMetaData[index].json();

      if (
        metadata &&
        metadata?.content &&
        metadata.content?.mime &&
        metadata.content?.uri &&
        metadata.content?.mime.includes('audio')
      ) {
        cast.embeds.unshift({ url: metadata.content?.uri });
        delete (cast as any).ipfs;
        response.push(cast as Cast);
      }
    }
    return response;
  } catch {
    return [];
  }
}

export default filterZoraFeed;
