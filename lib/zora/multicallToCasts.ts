import { ICastsAndContracts } from "@/types/ContractCastMap";
import { Cast } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { Chain, createPublicClient, http } from "viem";

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

export default multicallToCasts;