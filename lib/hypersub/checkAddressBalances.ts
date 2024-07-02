import HyperSub from '@/abis/hypersub.json';
import { Address, createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const BASEAlchemyKey = process.env.BASE_ALCHEMY_KEY!;
const hypersubContractAddress = process.env.HYPERSUB_CONTRACT_ADDRESS as Address;

const BASEpublicServerClient = createPublicClient({
  chain: base,
  transport: http(`https://base-mainnet.g.alchemy.com/v2/${BASEAlchemyKey}`),
});

const checkAddressBalances = async (verifications: Address[]) => {
  return BASEpublicServerClient.multicall({
    contracts: verifications.map(address => ({
      address: hypersubContractAddress,
      abi: HyperSub as any,
      functionName: 'balanceOf',
      args: [address],
    })),
    batchSize: 2000
  });
};

export default checkAddressBalances;