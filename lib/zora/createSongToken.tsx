import {
  CHAIN,
  MIN_MINTS_FOR_SONG_MARKET,
  REFFERAL_ADDRESS,
  SONG_MARKET_CONTRACT,
  ZORA_MINT_FEE,
} from '../consts';
import getSongMarketWalletClient from '../viem/getSongMarketWalletClient';
import creatorClient from './getCreatorClient';

const createSongToken = async (songLink: string) => {
  try {
    const walletClient = getSongMarketWalletClient(CHAIN);
    const account = walletClient.account;
    const tokenMetadataURI = `https://test-sonata.vercel.app/api/metadata?songLink=${songLink}`;
    const zoraResponse = await creatorClient.create1155OnExistingContract({
      contractAddress: SONG_MARKET_CONTRACT,
      token: {
        createReferral: REFFERAL_ADDRESS,
        tokenMetadataURI,
        salesConfig: {
          type: 'timed',
          marketCountdown: BigInt(24 * 60 * 60),
          erc20Name: 'sonata song market',
          erc20Symbol: 'SONG',
          minimumMarketEth: MIN_MINTS_FOR_SONG_MARKET * ZORA_MINT_FEE,
        },
        payoutRecipient: REFFERAL_ADDRESS,
      },
      account: account.address,
    });

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
