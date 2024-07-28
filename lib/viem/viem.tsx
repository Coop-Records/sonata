import { PublicClient, createPublicClient, http } from "viem";
import getViemNetwork from "./getViemNetwork";
import { zora } from "viem/chains";

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId);
  let publicClient = createPublicClient({
    chain,
    transport: http(
      chainId === zora.id ? "https://rpc.zora.energy" : undefined
    ),
  }) as any;
  return publicClient as PublicClient;
};
