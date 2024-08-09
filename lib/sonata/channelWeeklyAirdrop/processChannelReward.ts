import extractAddresses from "@/lib/privy/extractAddresses";
import pregenerateChannelWallet from "@/lib/privy/pregenerateChannelWallet";
import { stack } from "@/lib/stack/client";
import { eventAirdropChannel } from "@/lib/stack/events";
import { ChannelStats } from "@/types/ChannelStats";

async function processChannelReward({ channelId, addresses }: ChannelStats, points: number) {
  let account = addresses?.[0];
  if (!account) {
    const result = await pregenerateChannelWallet(channelId);
    account = extractAddresses(result.linked_accounts)[0];
  }
  const result = await stack.track(eventAirdropChannel(channelId), { account, points });
  if (!result.success) throw Error(`${channelId} processChannelReward failed`);

  return { account, success: true };
}

export default processChannelReward;