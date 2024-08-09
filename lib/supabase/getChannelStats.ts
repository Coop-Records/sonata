import { ChannelAccumulator, ChannelStats } from "@/types/ChannelStats";
import { CHANNELS } from "../consts";
import extractAddresses from "../privy/extractAddresses";
import getAllChannels from "../privy/getAllChannels";
import getPrivyIdentifier from "../privy/getIdentifier";
import getStackPoints from "../sonata/getStackPoints";
import { eventTipChannel } from "../stack/events";
import supabase from "./serverClient";

async function getChannelStats(filterChannels = false) {
  const limit = 1000;
  let offset = 0;
  const entries = {} as ChannelAccumulator;

  do {
    const query = supabase
      .from('posts')
      .select('channelId, post_hash, authorFid')
      .range(offset, offset + limit - 1);

    if (filterChannels) {
      query.in('channelId', CHANNELS.map(channel => channel.value));
    } else {
      query.neq('channelId', null);
    }

    const { data: posts, error } = await query;

    if (error) throw error;

    posts.forEach(({ channelId, ...post }) => {
      if (!entries[channelId]) entries[channelId] = {
        uniquePosts: new Set,
        uniqueAuthors: new Set,
      };

      entries[channelId].uniqueAuthors.add(post.authorFid);
      entries[channelId].uniquePosts.add(post.post_hash);
    });

    if (posts.length < limit) break;
    offset += limit;

  } while (offset);

  const wallets = await getAllChannels();

  const channels = await Promise.all(
    Object.keys(entries).map(async channelId => {
      let balance = 0, staked = 0, stakers = 0;
      const wallet = wallets.find(wallet => wallet.linked_accounts?.some(account => account.address === getPrivyIdentifier(channelId)));
      const addresses = wallet ? extractAddresses(wallet.linked_accounts) : [];

      if (addresses.length) {
        balance = await getStackPoints(addresses, eventTipChannel(channelId));
        const { data, error } = await supabase
          .from('channel_stake_stats')
          .select('stakers,staked')
          .eq('channelId', channelId)
          .single();

        if (!error) { stakers = data.stakers; staked = data.staked }
      }

      const channel: ChannelStats = {
        channelId,
        numberOfCurators: entries[channelId].uniqueAuthors.size,
        numberOfSongs: entries[channelId].uniquePosts.size,
        totalNotes: balance + staked,
        balance, staked,
        stakers, addresses,
      };
      return channel;
    })
  );

  return channels;
}

export default getChannelStats;