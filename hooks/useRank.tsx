import getProfileRank from '@/lib/sonata/getProfileRank';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { useEffect, useState } from 'react';

const useRank = () => {
  const [rank, setRank] = useState(null);
  const { profile } = useProfileProvider();

  useEffect(() => {
    const init = async () => {
      if (!profile?.verifications) return;
      const leaderBoardRank: any = await getProfileRank(profile?.verifications);
      setRank(leaderBoardRank);
    };
    if (!profile) return;

    init();
  }, [profile]);

  return rank;
};

export default useRank;
