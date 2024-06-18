import * as chains from 'viem/chains';
import { ZORA_TO_VIEM, ZoraChains } from '../consts';
import getCastContractMapping from "./mapCastToContract";
import multicallToCasts from './multicallToCasts';

async function getCastsMetadataLink(input: ReturnType<typeof getCastContractMapping>) {
  const data = [];

  for (const [key, value] of Object.entries(input)) {
    const chain = ZORA_TO_VIEM[key as ZoraChains];

    data.push(...await multicallToCasts({ chain: chains[chain], ...value }))
  }
  return data;
}

export default getCastsMetadataLink;
