import getAllChannels from "@/lib/privy/getAllChannels";
import { stack } from "@/lib/stack/client";

export async function GET() {
  const WEEKS_AGO = 5;

  try {
    const wallets = await getAllChannels();

    const channels = wallets.reduce((prev, curr) => {
      const email = curr.linked_accounts.find(account => account.type == 'email');
      const wallet = curr.linked_accounts.find(account => account.type === 'wallet');

      if (email && wallet) prev.push(stack.getEvents({
        event: `weekly_channel_tip_to_${wallet.address}`,
        limit: WEEKS_AGO,
        address: wallet.address
      }).then(events => ({ channelId: email.address.split('@')[0], weeklyDrops: events })));

      return prev;
    }, [] as Promise<{ channelId: string; weeklyDrops: any }>[]);

    const results = await Promise.all(channels);
    const data = results.filter(result => !!result.weeklyDrops?.length);

    return Response.json({ message: 'success', data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';