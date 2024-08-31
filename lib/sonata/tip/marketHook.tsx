import { SupabasePost } from '@/types/SupabasePost';
import fetchSongMarketForPost from './fetchSongMarketForPost';
import creatorClient from '@/lib/zora/getCreatorClient';
import { CHAIN, SONG_MARKET_CONTRACT } from '@/lib/consts';
import getSongMarketWalletClient from '@/lib/viem/getSongMarketWalletClient';

const marketHook = async (post: SupabasePost) => {
  const { totalNotes } = await fetchSongMarketForPost(post);
  console.log('totalNotes', totalNotes);
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

export default marketHook;
