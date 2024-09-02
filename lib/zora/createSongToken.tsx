import { CHAIN, SONG_MARKET_CONTRACT } from '../consts';
import getSongMarketWalletClient from '../viem/getSongMarketWalletClient';
import creatorClient from './getCreatorClient';

const createSongToken = async (songLink: string) => {
  const walletClient = getSongMarketWalletClient(CHAIN);
  const account = walletClient.account;
  const tokenMetadataURI = `https://test-sonata.vercel.app/api/metadata?songLink=${songLink}`;
  console.log('SWEETS tokenMetadataURI', tokenMetadataURI);
  const zoraResponse = await creatorClient.create1155OnExistingContract({
    contractAddress: SONG_MARKET_CONTRACT,
    token: {
      tokenMetadataURI,
    },
    account: account.address,
  });
  try {
    const hash = await walletClient.writeContract({
      ...zoraResponse?.parameters,
      account,
      chain: CHAIN,
    });
    return { hash, ...zoraResponse };
  } catch (error) {
    console.error('zora create error', error);
  }
};

export default createSongToken;
