import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { forEach } from 'lodash';
import { createPublicClient, http } from "viem";
import * as chains from 'viem/chains';
import { ZORA_TO_VIEM, ZoraChains } from '../consts';
import getCastContractMapping from "./mapCastToContract";

async function getCastsMetadataLink(
  input: ReturnType<typeof getCastContractMapping>
) {
  const data: (Cast & { ipfs: string })[] = [];

  for (const [key, { contracts, casts }] of Object.entries(input)) {
    const chain = ZORA_TO_VIEM[key as ZoraChains];

    const responses = await createPublicClient({
      chain: chains[chain],
      transport: http()
    }).multicall({ contracts });

    forEach(responses, ({ result, status }, index) => {
      if (status === 'success' && typeof result === 'string')
        data.push({ ...casts[index], ipfs: result });
    });
  }
  return data;
}

export default getCastsMetadataLink;
