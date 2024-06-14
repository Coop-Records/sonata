'use client';
import fetchMetadata from '@/lib/fetchMetadata';
import findValidEmbed from '@/lib/findValidEmbed';
import getNeynarProfile from '@/lib/neynar/getNeynarProfile';
import getUserSongs from '@/lib/sonata/getUserSongs';
import { ProfileData } from '@/types/ProfileData';
import { SupabasePost } from '@/types/SupabasePost';
import { TrackMetadata } from '@/types/Track';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type ProfileProviderType = {
  profile: ProfileData | null;
  songs: SupabasePost[];
  topSongMetadata: TrackMetadata | null;
};

const ProfileContext = createContext<ProfileProviderType>({} as any);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [songs, setSongs] = useState<SupabasePost[]>([]);
  const [topSongMetadata, setTopSongMetadata] = useState<TrackMetadata | null>(null);

  useEffect(() => {
    const init = async () => {
      const data = await getNeynarProfile(username as string);
      setProfile(data);
      const posts = await getUserSongs(data.fid);
      setSongs(posts.songs);
      if (posts.length <= 0) return;
      const topPost = posts.songs[0];
      const embed = findValidEmbed(topPost);
      const url = embed?.url;
      if (!url) return;
      try {
        const metadata = await fetchMetadata(url, topPost);
        if (!metadata) return;
        setTopSongMetadata(metadata);
      } catch (error) {}
    };

    if (!username) return;
    init();
  }, [username]);

  const value = {
    profile,
    songs,
    topSongMetadata,
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
