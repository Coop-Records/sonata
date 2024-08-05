'use client';

import Feeds from '@/app/(feeds)/feeds';
import FeedStakes from '@/components/Feed/FeedStakes';
import useStakeFeed from '@/hooks/useStakeFeed';
import { useFeedProvider } from '@/providers/FeedProvider';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { FeedType } from '@/types/Feed';
import { Loader2 } from 'lucide-react';

export default function ProfileFeed() {
  const { feedType } = useFeedProvider();
  const { profile } = useProfileProvider();
  const { loading, feedStake } = useStakeFeed(feedType, profile?.fid);
  const isStake = feedType === FeedType.Stakes;

  if (loading) return <Loader2 className='mx-auto size-8 animate-spin' />;

  if (isStake) return <FeedStakes feed={feedStake} />;

  return <Feeds />;
}
