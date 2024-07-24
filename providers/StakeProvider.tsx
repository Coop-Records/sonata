import { TrackMetadata } from '@/types/Track';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useTipProvider } from './TipProvider';
import { useParams } from 'next/navigation';
import getChannelDetails from '@/lib/sonata/getChannelDetails';
import { useNeynarProvider } from './NeynarProvider';

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
const StakeContext = createContext({
  balance: BigInt(0),
  loading: true,
  userStakedAmount: 0,
  channelDetails: DEFAULT_CHANNEL_DETAILS,
  setChannelDetails: (() => { }) as Dispatch<SetStateAction<typeof DEFAULT_CHANNEL_DETAILS>>,
  setUserStakedAmount: (() => { }) as Dispatch<SetStateAction<number>>
});

const StakeProvider = ({ children }: any) => {
  const channelId = useParams().channelId as string | undefined;
  const { signer } = useNeynarProvider();
  const { balance } = useTipProvider();
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

  return (
    <StakeContext.Provider
      value={{
        loading,
        balance,
        channelDetails,
        userStakedAmount,
        setChannelDetails,
        setUserStakedAmount,
      }}
    >
      {children}
    </StakeContext.Provider>
  );
};

export const useStakeProvider = () => {
  const context = useContext(StakeContext);
  if (!context) throw new Error('useStakeProvider failed');

  return context;
};

export default StakeProvider;