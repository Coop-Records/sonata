'use client';
import fetchMetadata from '@/lib/fetchMetadata';
import findValidEmbed from '@/lib/findValidEmbed';
import getFollowers from '@/lib/neynar/getFollowers';
import getNeynarProfile from '@/lib/neynar/getNeynarProfile';
import getUserSongs from '@/lib/sonata/getUserSongs';
import { NeynarUserData } from '@/types/NeynarUserData';
import { SupabasePost } from '@/types/SupabasePost';
import { TrackMetadata } from '@/types/Track';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type ProfileProviderType = {
  profile: NeynarUserData | null;
  songs: SupabasePost[];
  topSongMetadata: TrackMetadata | null;
  followers: NeynarUserData[];
  loading: boolean;
};

const ProfileContext = createContext<ProfileProviderType>({} as any);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { username } = useParams();
  const [profile, setProfile] = useState<NeynarUserData | null>(null);
  const [songs, setSongs] = useState<SupabasePost[]>([]);
  const [topSongMetadata, setTopSongMetadata] = useState<TrackMetadata | null>(null);
  const [followers, setFollowers] = useState<NeynarUserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!username) {
        setProfile(null);
        setFollowers([]);
        setSongs([]);
        setTopSongMetadata(null);
        setLoading(false);
        return;
      }

      const neynarProfile = await getNeynarProfile(username as string);
      setProfile(neynarProfile);
      const neynarFollowers = await getFollowers(neynarProfile.fid);
      setFollowers(neynarFollowers);
      const posts = await getUserSongs(neynarProfile.fid);
      if (posts.length <= 0) return;
      setSongs(posts.songs);
      const topPost = posts.songs[0];
      const embed = findValidEmbed(topPost);
      const url = embed?.url;
      if (!url) return;
      try {
        const metadata = await fetchMetadata(url, topPost);
        if (!metadata) return;
        setTopSongMetadata(metadata);
      } catch (error) {
        console.log(error);
      }
    };

    init().finally(() => setLoading(false));
  }, [username]);

  const value = {
    loading,
    profile,
    songs,
    topSongMetadata,
    followers,
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
