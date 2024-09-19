import getAllChannels from '@/lib/privy/getAllChannels';
import { stack } from '@/lib/stack/client';
import { eventAirdropChannel } from '@/lib/stack/events';
import { getAddress } from 'viem';

async function getChannelWeeklyAirdropData() {
  const wallets = await getAllChannels();

  const channels = wallets.reduce(
    (prev, curr) => {
      const email = curr.linked_accounts.find((account) => account.type == 'email');
      const wallet = curr.linked_accounts.find((account) => account.type === 'wallet');

      if (email && wallet) {
        const channelId = email.address.split('@')[0];

        prev.push(
          stack
            .getEvents({
              query: stack
                .eventsQuery()
                .where({
                  eventType: eventAirdropChannel(channelId),
                  associatedAccount: getAddress(wallet.address),
                })
                .build(),
            })
            .then((events) => ({ channelId, weeklyDrops: events })),
        );
      }

      return prev;
    },
    [] as Promise<{ channelId: string; weeklyDrops: any }>[],
  );

  const chunkSize = 99;
  const data = [];
  for (let i = 0; i < channels.length; i += chunkSize) {
    const chunk = channels.slice(i, i + chunkSize);
    const items = await Promise.all(chunk);

    for (const item of items) {
      if (item.weeklyDrops?.length) data.push(item);
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return data;
}

export default getChannelWeeklyAirdropData;
