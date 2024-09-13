'use client';
import Loader from '@/components/Loader';
import UserStakes from '@/components/UserStakes';
import useUserStakes from '@/hooks/useUserStakes';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { notFound, useSearchParams } from 'next/navigation';
import Feeds from '../feeds';

export default function ProfileHome() {
  const { error, profile } = useProfileProvider();
  if (error) notFound();

  const tab = useSearchParams().get('tab');
  const { loading, userStakes } = useUserStakes(tab, profile?.fid);

  if (tab === 'stakes') return loading ? <Loader /> : <UserStakes stakes={userStakes} />;

  return <Feeds />;
}
