const getIpfsLink = (hash: string) =>
  hash?.indexOf?.("ipfs://") > -1 ? hash.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/") : hash

export default getIpfsLink
