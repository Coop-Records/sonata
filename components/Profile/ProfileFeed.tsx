'use client';

import Feeds from '@/app/(feeds)/feeds';
import UserStakes from '@/components/UserStakes';
import useUserStakes from '@/hooks/useUserStakes';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { FeedType } from '@/types/Feed';
import Loader from '@/components/Loader';

export default function ProfileFeed() {
  const { feedType } = useFeedProvider();
  const { profile } = useProfileProvider();
  const { loading: loadingStakes, userStakes } = useUserStakes(feedType, profile?.fid);

  return (
    <>
      {feedType === FeedType.Stakes ? (
        loadingStakes ? (
          <Loader />
        ) : (
          <UserStakes stakes={userStakes} />
        )
      ) : (
        <Feeds />
      )}
    </>
  );
}
