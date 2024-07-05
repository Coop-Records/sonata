import { CHANNELS, FEE } from "@/lib/consts";
import pregenerateChannelWallet from "../../privy/pregenerateChannelWallet";
import searchChannels from "../../privy/searchChannels";
import getChannelIdFromUrl from "./getChannelIdFromUrl";

async function getChannelTipInfo(referer = '', amount: number | null = null) {
  const channelId = getChannelIdFromUrl(referer);
  if (!channelId || !CHANNELS.some(channel => channel.value === channelId)) return null;

  try {
    let [channel] = await searchChannels([channelId]);

    if (!channel) {
      const response = await pregenerateChannelWallet(channelId);
      channel = await response.json();
    }
    const account = channel.linked_accounts.find(account => account.type === 'wallet')!;

    return { channelAmount: Math.floor(Number(amount ?? 0) * FEE), channelAddress: account.address, channelId };
  } catch (error) {
    console.error(error)
    return null;
  }
}

export default getChannelTipInfo;
