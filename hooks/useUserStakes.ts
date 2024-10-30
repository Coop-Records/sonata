import getAllUserStakes from '@/lib/sonata/staking/getAllUserStakes';
import { UserStake } from '@/types/Stake';
import { useEffect, useState } from 'react';

function useUserStakes(profileFid?: number) {
  const [loading, setLoading] = useState(false);
  const [userStakes, setUserStakes] = useState<UserStake[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    getAllUserStakes(profileFid, controller.signal)
      .then(setUserStakes)
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [profileFid]);

  return { userStakes, loading };
}

export default useUserStakes;
