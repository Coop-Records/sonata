import { FeedStake } from "@/types/Feed";
import { Channel } from "@neynar/nodejs-sdk/build/neynar-api/v2";


async function getAllUserStakes(fid: number | undefined, signal?: AbortSignal) {
  try {
    if (!fid) throw 'fid required';

    const response = await fetch(`/api/stake?fid=${fid}`, { signal });
    const { data }: { data: FeedStake[] } = await response.json();

    const details = await Promise.all(data.map(({ channelId }) =>
      fetch(`/api/neynar/getChannelDetails?channelId=${channelId}`, { signal })
        .then(res => res.json())
    ));

    return details.map(({ channel }: { channel: Channel }, i) => ({
      channelId: data[i].channelId,
      icon: channel.image_url ?? '/images/placeholder.png',
      description: channel.description ?? '',
      points: data[i].points
    }));

  } catch (error) {
    return [];
  }
}

export default getAllUserStakes;