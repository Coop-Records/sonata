const thirdwebId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;

const getIpfsLink = (hash: string) =>
  hash?.indexOf?.("ipfs://") > -1
    ? hash.replace("ipfs://", `https://${thirdwebId}.ipfscdn.io/ipfs/`)
    : hash

export default getIpfsLink;
