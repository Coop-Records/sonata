import getChannelDetails from "@/lib/sonata/getChannelDetails";
import { useNeynarProvider } from "@/providers/NeynarProvider";
import { TrackMetadata } from "@/types/Track";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEFAULT_CHANNEL_DETAILS = {
  info: undefined as any,
  balance: 0,
  moderators: [] as any[],
  topSong: undefined as TrackMetadata | undefined,
  staking: {
    stakers: 0,
    staked: 0,
  },
};

function useChannelDetails() {
  const channelId = useParams().channelId as string | undefined;
  const { signer } = useNeynarProvider();

  const [userStakedAmount, setUserStakedAmount] = useState(0);
  const [channelDetails, setChannelDetails] = useState(DEFAULT_CHANNEL_DETAILS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (channelId) {
      getChannelDetails(channelId, signer?.fid).then(data => {
        const mods = [];
        const info = data.info;
        !!info?.hosts?.[0] && mods.push(info.hosts[0]);
        !!info?.moderator && mods.push(info.moderator);

        setChannelDetails({
          info,
          balance: data.balance ?? 0,
          topSong: data.topSong,
          moderators: mods,
          staking: {
            staked: data.staking?.staked ?? 0,
            stakers: data.staking?.stakers ?? 0,
          },
        });

        setUserStakedAmount(data.user?.stakedAmount ?? 0);
      }).finally(() => setLoading(false));
    }
    return () => { setLoading(true); }
  }, [channelId, signer]);

  return {
    loading, setLoading,
    channelDetails, setChannelDetails,
    userStakedAmount, setUserStakedAmount
  };
}

export default useChannelDetails;
export { DEFAULT_CHANNEL_DETAILS };
