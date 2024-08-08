'use client';
import ProfileFeed from '@/components/Profile/ProfileFeed';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { notFound } from 'next/navigation';

export default function ProfileHome() {
  const { error } = useProfileProvider();
  if (error) {
    notFound();
  }
  return <ProfileFeed />;
}
