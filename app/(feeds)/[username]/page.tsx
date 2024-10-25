'use client';
import UserStakes from '@/components/UserStakes';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { notFound, useSearchParams } from 'next/navigation';
import Feeds from '../feeds';

export default function ProfileHome() {
  const { error } = useProfileProvider();
  if (error) notFound();

  const tab = useSearchParams().get('tab');

  if (tab === 'stakes') return <UserStakes />;

  return <Feeds />;
}
