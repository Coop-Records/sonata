import getAllUserStakes from "@/lib/sonata/staking/getAllUserStakes";
import { UserStake } from "@/types/Stake";
import { useEffect, useState } from "react";

function useUserStakes(tab: string | null, profileFid?: number) {
  const [loading, setLoading] = useState(false);
  const [userStakes, setUserStakes] = useState<UserStake[]>([]);

  useEffect(() => {
    if (tab !== 'stakes') return;
    const controller = new AbortController();
    setLoading(true);
    getAllUserStakes(profileFid, controller.signal)
      .then(setUserStakes)
      .finally(() => setLoading(false));

    return () => { setUserStakes([]); controller.abort() };
  }, [tab, profileFid]);

  return { userStakes, loading };
}

export default useUserStakes;