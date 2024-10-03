import { ChannelStats } from '@/types/ChannelStats';
import extractAddresses from '../privy/extractAddresses';
import getAllChannels from '../privy/getAllChannels';
import getPrivyIdentifier from '../privy/getIdentifier';
import getStackPoints from '../sonata/getStackPoints';
import { eventStakeChannel, eventTipChannel } from '../stack/events';
import getChannelAuthorsAndPosts from './getChannelAuthorsAndPosts';
import supabase from './serverClient';

async function getChannelStats(filterChannels = false) {
  const entries = await getChannelAuthorsAndPosts(filterChannels);

  const wallets = await getAllChannels();

  const channels = await Promise.all(
    Object.keys(entries).map(async (channelId) => {
      let balance = 0,
        staked = 0,
        stakers = 0;
      const wallet = wallets.find((wallet) =>
        wallet.linkedAccounts?.some(
          (account) =>
            account.type === 'email' && account.address === getPrivyIdentifier(channelId),
        ),
      );
      const addresses = wallet ? extractAddresses(wallet.linkedAccounts) : [];

      if (addresses.length) {
        balance = await getStackPoints(addresses, eventTipChannel(channelId));
        staked = await getStackPoints(addresses, eventStakeChannel(channelId));
        const { data, error } = await supabase
          .from('channel_stake_stats')
          .select('stakers')
          .eq('channelId', channelId)
          .single();

        if (!error) {
          stakers = data.stakers;
        }
      }

      const channel: ChannelStats = {
        channelId,
        numberOfCurators: entries[channelId].uniqueAuthors.size,
        numberOfSongs: entries[channelId].uniquePosts.size,
        totalNotes: balance + staked,
        balance,
        staked,
        stakers,
        addresses,
      };
      return channel;
    }),
  );

  return channels;
}

export default getChannelStats;
