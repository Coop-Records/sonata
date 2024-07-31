import getAllUserStakes from "@/lib/sonata/staking/getAllUserStakes";
import { FeedStake, FeedType } from "@/types/Feed";
import { useEffect, useState } from "react";

function useStakeFeed(feedType?: string, profileFid?: number) {
  // const previousProfileFid = useRef<number>();
  const [loading, setLoading] = useState(false);
  const [feedStake, setFeedStake] = useState<FeedStake[]>([]);

  useEffect(() => {
    if (feedType !== FeedType.Stakes) return;
    const controller = new AbortController();
    setLoading(true);
    getAllUserStakes(profileFid, controller.signal)
      .then(setFeedStake)
      .finally(() => setLoading(false));

    return () => { setFeedStake([]); controller.abort() };
  }, [feedType, profileFid]);

  return { feedStake, loading };
}

export default useStakeFeed;