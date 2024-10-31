'use client';
import UserStakes from '@/components/UserStakes';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { notFound, useSearchParams } from 'next/navigation';
import Feeds from '../feeds';
import Tabs from '@/components/Tabs';
import { FeedType } from '@/types/Feed';
import Profile from '@/components/Profile';

const tabs = [
  { label: 'Posts', value: FeedType.Posts },
  { label: 'Stakes', value: 'stakes' },
];

export default function ProfileHome() {
  const { error, profile } = useProfileProvider();
  if (error) notFound();

  const tab = useSearchParams().get('tab');

  return (
    <div>
      {profile && <Profile />}
      <Tabs tabs={tabs} className="mt-4" />
      {tab === 'stakes' ? <UserStakes fid={profile?.fid} /> : <Feeds />}
    </div>
  );
}
