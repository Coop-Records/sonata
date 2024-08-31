import { CHAIN, SONG_MARKET_CONTRACT } from '../consts';
import getSongMarketWalletClient from '../viem/getSongMarketWalletClient';
import creatorClient from './getCreatorClient';

const createSongToken = async () => {
  const walletClient = getSongMarketWalletClient(CHAIN);
  const account = walletClient.account;
  const { parameters } = await creatorClient.create1155OnExistingContract({
    contractAddress: SONG_MARKET_CONTRACT,
    token: {
      tokenMetadataURI: 'ipfs://bafkreibmzv3cry5ojsltgfk7tgvy7xawr3tmnqv3kvmn543zyddia3o35e',
    },
    account: account.address,
  });
  try {
    const response = await walletClient.writeContract({
      ...parameters,
      account,
      chain: CHAIN,
    });
    console.log('zora create response', response);
    return response;
  } catch (error) {
    console.error('zora create error', error);
  }
};

export default createSongToken;
