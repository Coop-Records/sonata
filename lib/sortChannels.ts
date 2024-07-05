import { ChannelStats } from "@/types/ChannelStats";

function sortChannels(channelStats: ChannelStats[]) {
  return channelStats.sort((a, b) => {
    return (
      (b.numberOfNotes! - a.numberOfNotes!) ||
      (b.numberOfSongs - a.numberOfSongs) ||
      (b.numberOfCurators - a.numberOfCurators)
    );
  });
}

export default sortChannels;
