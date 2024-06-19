import getProfileRank from '@/lib/sonata/getProfileRank';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { useEffect, useState } from 'react';

const useRank = () => {
  const [rank, setRank] = useState(0);
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

  if (rank <= 0) {
    return null;
  }

  return rank;
};

export default useRank;
