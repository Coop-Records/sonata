import getAllUserStakes from '@/lib/sonata/staking/getAllUserStakes';
import { UserStake } from '@/types/Stake';
import { useEffect, useState } from 'react';

function useUserStakes(fid?: number | null) {
  const [loading, setLoading] = useState(false);
  const [stakes, setStakes] = useState<UserStake[]>([]);
  const [stakedAmount, setStakedAmount] = useState(0);

  useEffect(() => {
    if (!fid) return;
    const controller = new AbortController();
    const fetchUserStakes = async () => {
      try {
        setLoading(true);
        const stakes = await getAllUserStakes(fid);
        const stakedAmount = stakes.reduce((acc, stake) => acc + stake.points, 0);

        setStakes(stakes);
        setStakedAmount(stakedAmount);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserStakes();
    return () => {
      controller.abort();
    };
  }, [fid]);

  return { stakes, stakedAmount, loading };
}

export default useUserStakes;
