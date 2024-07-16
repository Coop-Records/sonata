import getChannelDetails from "@/lib/sonata/getChannelDetails";
import { useNeynarProvider } from "@/providers/NeynarProvider";
import { TrackMetadata } from "@/types/Track";
import { useEffect, useMemo, useState } from "react";

const defaultChannel = {
  info: undefined as any,
  balance: 0,
  topSong: undefined as TrackMetadata | undefined,
  staking: {
    stakers: 0,
    staked: 0,
  },
};

function useChannelDetails(channelId = '') {
  const { signer } = useNeynarProvider();

  const [userStakedAmount, setUserStakedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState(defaultChannel);

  const moderators = useMemo(() => {
    const users = [];
    const info = channel.info;

    !!info?.hosts?.[0] && users.push(info.hosts[0]);
    !!info?.moderator && users.push(info.moderator);

    return users;
  }, [channel]);

  useEffect(() => {
    if (channelId) {
      getChannelDetails(channelId, signer?.fid)
        .then(data => {
          setChannel({
            info: data.info,
            balance: data.balance ?? 0,
            topSong: data.topSong,
            staking: {
              staked: data.staking?.staked ?? 0,
              stakers: data.staking?.stakers ?? 0,
            },
          });

          setUserStakedAmount(data.user?.stakedAmount ?? 0);
        })
        .finally(() => setLoading(false));
    }
    return () => {
      setChannel(defaultChannel);
      setLoading(true);
    };
  }, [channelId, signer?.fid]);

  return { moderators, channel, userStakedAmount, loading, signedIn: !!signer };
}

export default useChannelDetails;