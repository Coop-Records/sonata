import { CHANNELS, FEE } from "@/lib/consts";
import pregenerateChannelWallet from "../../privy/pregenerateChannelWallet";
import searchChannels from "../../privy/searchChannels";

async function getChannelTipInfo(channelId = '', amount: number | null = null) {
  if (!channelId || !CHANNELS.some(channel => channel.value === channelId)) return null;

  try {
    let [channel] = await searchChannels([channelId]);

    if (!channel) {
      const response = await pregenerateChannelWallet(channelId);
      channel = await response.json();
      if (!response.ok) throw Error(response.statusText);
    }
    const account = channel.linked_accounts.find(account => account.type === 'wallet')!;

    return { channelAmount: Math.floor(Number(amount ?? 0) * FEE), channelAddress: account.address, channelId };
  } catch (error) {
    console.error('getChannelTipInfo', error)
    return null;
  }
}

export default getChannelTipInfo;
