import getAllUserStakes from "@/lib/sonata/staking/getAllUserStakes";
import { FeedType } from "@/types/Feed";
import { UserStake } from "@/types/Stake";
import { useEffect, useState } from "react";

function useUserStakes(feedType?: string, profileFid?: number) {
  const [loading, setLoading] = useState(false);
  const [userStakes, setUserStakes] = useState<UserStake[]>([]);

  useEffect(() => {
    if (feedType !== FeedType.Stakes) return;
    const controller = new AbortController();
    setLoading(true);
    getAllUserStakes(profileFid, controller.signal)
      .then(setUserStakes)
      .finally(() => setLoading(false));

    return () => { setUserStakes([]); controller.abort() };
  }, [feedType, profileFid]);

  return { userStakes, loading };
}

export default useUserStakes;