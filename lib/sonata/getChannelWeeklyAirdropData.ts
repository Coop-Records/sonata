import getAllChannels from "@/lib/privy/getAllChannels";
import { stack } from "@/lib/stack/client";

async function getChannelWeeklyAirdropData() {

  const wallets = await getAllChannels();

  const channels = wallets.reduce((prev, curr) => {
    const email = curr.linked_accounts.find(account => account.type == 'email');
    const wallet = curr.linked_accounts.find(account => account.type === 'wallet');

    if (email && wallet) prev.push(stack.getEvents({
      event: `weekly_channel_tip_to_${wallet.address}`,
      address: wallet.address
    }).then(events => ({ channelId: email.address.split('@')[0], weeklyDrops: events })));

    return prev;
  }, [] as Promise<{ channelId: string; weeklyDrops: any }>[]);

  const results = await Promise.all(channels);
  const data = results.filter(result => !!result.weeklyDrops?.length);

  return data;
}

export default getChannelWeeklyAirdropData;