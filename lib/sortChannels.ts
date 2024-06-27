import { cache } from "react";
import getChannelStats from "./supabase/getChannelStats";

async function sortChannels() {
  const stats = await cache(getChannelStats)(true, true);

  return stats.sort((a, b) => {
    return (
      (b.numberOfNotes! - a.numberOfNotes!) ||
      (b.numberOfSongs - a.numberOfSongs) ||
      (b.numberOfCurators - a.numberOfCurators)
    );
  }).map(channel => channel.channelId);
}

export default sortChannels;
