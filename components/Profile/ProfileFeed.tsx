'use client';

import Feeds from '@/app/(feeds)/feeds';
import UserStakes from '@/components/UserStakes';
import useUserStakes from '@/hooks/useUserStakes';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { FeedType } from '@/types/Feed';
import { Loader2 } from 'lucide-react';

export default function ProfileFeed() {
  const { feedType } = useFeedProvider();
  const { profile } = useProfileProvider();
  const { loading, userStakes } = useUserStakes(feedType, profile?.fid);
  const isStake = feedType === FeedType.Stakes;

  if (loading) return <Loader2 className='mx-auto size-8 animate-spin' />;

  if (isStake) return <UserStakes stakes={userStakes} />;

  return <Feeds />;
}
