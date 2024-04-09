import getChainIdForNetwork from './getChainIdForNetwork';

const parseEmbedUrl = (url: string) => {
  if (!url) return null;
  const pattern =
    /https:\/\/zora\.co\/collect\/(base|zora):0x([a-fA-F0-9]+)\/(\d+)\?referrer=0x([a-fA-F0-9]+)/;
  const match = url.match(pattern);
  if (match) {
    const chainId = getChainIdForNetwork(match[1]);
    return {
      network: match[1],
      contractAddress: `0x${match[2]}`,
      tokenId: match[3],
      referrer: `0x${match[4]}`,
      chainId,
    };
  }
  return null;
};

export default parseEmbedUrl;
