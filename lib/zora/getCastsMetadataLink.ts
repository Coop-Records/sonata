import { Cast } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { Chain, createPublicClient, http, } from "viem";
import * as chains from 'viem/chains';
import getCastContractMapping, { ICastsAndContracts } from "./mapCastToContract";

async function multicallToCasts(
  { chain, contracts, casts }: ICastsAndContracts & { chain: Chain }
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

/**
 * Given a list of blockchain callable contract queries to casts mapping, 
 * will run the queries retrieving the ipfs metadata link. 
 * Will then attach the link to the casts.
 * 
 */
async function getCastsMetadataLink({
  arbitrum,
  base,
  blast,
  mainnet,
  optimism,
  pgn,
  zora
}: ReturnType<typeof getCastContractMapping>) {

  const data = [];

  if (arbitrum.contracts.length) data.push(...await multicallToCasts({ chain: chains.arbitrum, ...arbitrum }));
  if (base.contracts.length) data.push(...await multicallToCasts({ chain: chains.base, ...base }));
  if (blast.contracts.length) data.push(...await multicallToCasts({ chain: chains.blast, ...blast }));
  if (mainnet.contracts.length) data.push(...await multicallToCasts({ chain: chains.mainnet, ...mainnet }));
  if (optimism.contracts.length) data.push(...await multicallToCasts({ chain: chains.optimism, ...optimism }));
  if (pgn.contracts.length) data.push(...await multicallToCasts({ chain: chains.pgn, ...pgn }));
  if (zora.contracts.length) data.push(...await multicallToCasts({ chain: chains.zora, ...zora }));

  return data;
}

export default getCastsMetadataLink;
