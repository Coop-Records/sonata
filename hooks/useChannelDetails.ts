import getChannelDetails from "@/lib/sonata/getChannelDetails";
import { useNeynarProvider } from "@/providers/NeynarProvider";
import { useTipProvider } from "@/providers/TipProvider";
import { useEffect, useMemo, useState } from "react";

function useChannelDetails(channelId = '') {
  const { signer } = useNeynarProvider();
  const {
    channelDetails: channel,
    setChannelDetails: setChannel,
    userStakedAmount,
    setUserStakedAmount
  } = useTipProvider();
  const [loading, setLoading] = useState(true);

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
    return () => { setLoading(true); }
  }, [channelId, signer?.fid, setChannel, setUserStakedAmount]);

  return {
    moderators,
    channel: channel,
    userStakedAmount,
    loading,
    signedIn: !!signer
  };
}

export default useChannelDetails;