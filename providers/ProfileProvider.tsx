'use client';
import getNeynarProfile from '@/lib/neynar/getNeynarProfile';
import { ProfileData } from '@/types/ProfileData';
import { useParams } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ProfileProviderType = {
  profile: ProfileData | null
};

const ProfileContext = createContext<ProfileProviderType>({} as any);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { username } = useParams()
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    const init = async () => {
      const data = await getNeynarProfile(username as string)
      setProfile(data)
    }

    if (!username) return
    init()
  }, [username])
  
  const value = {
    profile
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfileProvider = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileProvider must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileProvider;
