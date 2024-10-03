import { CHANNELS, FEE } from '@/lib/consts';
import pregenerateChannelWallet from '@/lib/privy/pregenerateChannelWallet';
import searchChannels from '@/lib/privy/searchChannels';

async function getChannelTipInfo(channelId = '', amount: number | null = null) {
  if (!channelId || !CHANNELS.some((channel) => channel.value === channelId)) return null;

  try {
    let [channel] = await searchChannels([channelId]);

    if (!channel) channel = await pregenerateChannelWallet(channelId);
    const account = channel.linkedAccounts.find((account) => account.type === 'wallet')!;

    return {
      channelAmount: Math.floor(Number(amount ?? 0) * FEE),
      channelAddress: account.address,
      channelId,
    };
  } catch (error) {
    console.error('getChannelTipInfo', error);
    return null;
  }
}

export default getChannelTipInfo;
