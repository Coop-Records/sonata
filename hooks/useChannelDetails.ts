import { CHANNELS } from '@/lib/consts';
import getChannelDetails from '@/lib/sonata/getChannelDetails';
import { TrackMetadata } from '@/types/Track';
import { usePrivy } from '@privy-io/react-auth';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const { channelId } = useParams();
  const { user } = usePrivy();
  const [userStakedAmount, setUserStakedAmount] = useState(0);
  const [channelImage, setChannelImage] = useState('');
  const [channelDetails, setChannelDetails] = useState(DEFAULT_CHANNEL_DETAILS);
  const [loading, setLoading] = useState(true);

  const fid = user?.farcaster?.fid;

  useEffect(() => {
    const fetchChannelDetails = async () => {
      if (!(channelId && fid)) {
        return;
      }
      setLoading(true);
      try {
        const image = CHANNELS.find(({ value }) => value === channelId)?.icon;
        setChannelImage(image ?? '/images/placeholder.png');
        const data = await getChannelDetails(channelId as string, fid);
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
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchChannelDetails();
  }, [channelId, fid]);

  return {
    channelImage,
    loading,
    setLoading,
    channelDetails,
    setChannelDetails,
    userStakedAmount,
    setUserStakedAmount,
  };
}

export default useChannelDetails;
export { DEFAULT_CHANNEL_DETAILS };
