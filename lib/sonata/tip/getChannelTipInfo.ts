import { FEE } from "@/lib/consts";
import pregenerateChannelWallet from "../../privy/pregenerateChannelWallet";
import searchChannels from "../../privy/searchChannels";

function getChannelId(url: string) {
  const match = url.match(/^(\w+):\/\/([^/]+)\/channel\/(\w+)$/);
  if (match) return match[3];
  return null;
}

async function getChannelTipInfo(referer = '', amount: number | null = null) {
  const channelId = getChannelId(referer);
  if (!channelId) return null;
  try {
    let [channel] = await searchChannels([channelId]);

    if (!channel) {
      const response = await pregenerateChannelWallet(channelId);
      channel = await response.json();
    }
    const account = channel.linked_accounts.find(account => account.type === 'wallet')!;

    return { channelAmount: Number(amount ?? 0) * FEE, channelAddress: account.address };
  } catch (error) {
    console.error(error)
    return null;
  }
}

export default getChannelTipInfo;
