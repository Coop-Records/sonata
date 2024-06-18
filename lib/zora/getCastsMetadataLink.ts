import * as chains from 'viem/chains';
import getCastContractMapping from "./mapCastToContract";
import multicallToCasts from './multicallToCasts';

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
