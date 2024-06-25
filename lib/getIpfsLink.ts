const thirdwebId = process.env.THIRDWEB_CLIENT_ID!;

const getIpfsLink = (hash: string) =>
  hash?.indexOf?.("ipfs://") > -1
    ? hash.replace("ipfs://", `https://${thirdwebId}.ipfscdn.io/ipfs/`)
    : hash

export default getIpfsLink;
