import pregenerateChannelWallet from "../privy/pregenerateChannelWallet";
import searchChannels from "../privy/searchChannels";

const FEE = Number(process.env.CHANNEL_FEE ?? 10) / 100;

function getChannelId(url: string) {
  const match = url.match(/^(\w+):\/\/([^/]+)\/channel\/(\w+)$/);
  if (match) return match[3];
  return null;
}

async function getChannelTipInfo(req: Request, amount: number) {
  try {
    const channelId = getChannelId(req.headers.get('referer') ?? '');
    if (!channelId) throw new Error('No channelId found');

    let [channel] = await searchChannels([channelId]);

    if (!channel) {
      const response = await pregenerateChannelWallet(channelId);
      channel = await response.json();

      const account = channel.linked_accounts.find(account => account.type === 'wallet')!;

      return {
        channelAmount: Number(amount ?? 0) * FEE,
        channelAddress: account.address,
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getChannelTipInfo;
