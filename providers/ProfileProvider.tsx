'use client';
import getFidByName from '@/lib/farcaster/getFidByName';
import getUserFromFid from '@/lib/farcaster/getUserFromFid';
import fetchMetadata from '@/lib/fetchMetadata';
import findValidEmbed from '@/lib/findValidEmbed';
import getFollowers from '@/lib/neynar/getFollowers';
import getUserSongs from '@/lib/sonata/getUserSongs';
import { NeynarUserData } from '@/types/NeynarUserData';
import { SupabasePost } from '@/types/SupabasePost';
import { SupabaseUser } from '@/types/SupabaseUser';
import { TrackMetadata } from '@/types/Track';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type ProfileProviderType = {
  profile?: SupabaseUser;
  songs: SupabasePost[];
  topSongMetadata: TrackMetadata | null;
  followers: NeynarUserData[];
  loading: boolean;
  error: Error | null;
};

const ProfileContext = createContext<ProfileProviderType>({} as any);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { username }: { username?: string } = useParams();
  const [profile, setProfile] = useState<SupabaseUser>();
  const [songs, setSongs] = useState<SupabasePost[]>([]);
  const [topSongMetadata, setTopSongMetadata] = useState<TrackMetadata | null>(null);
  const [followers, setFollowers] = useState<NeynarUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);
        setProfile(undefined);
        setFollowers([]);
        setSongs([]);
        setTopSongMetadata(null);

        if (!username) return;
        const fid = await getFidByName(username);
        if (!fid) throw new Error('user not found');
        const user = await getUserFromFid(fid);
        if (!user) throw new Error('user not found');
        setProfile(user);

        const neynarFollowers = await getFollowers(fid);
        setFollowers(neynarFollowers);
        const posts = await getUserSongs(fid);
        if (posts.length <= 0) return;
        setSongs(posts.songs);
        const topPost = posts.songs[0];
        const embed = findValidEmbed(topPost);
        const url = embed?.url;
        if (!url) return;
        const metadata = await fetchMetadata(url, topPost);
        if (!metadata) return;
        setTopSongMetadata(metadata);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [username]);

  const value = {
    loading,
    error,
    profile,
    songs,
    topSongMetadata,
    followers,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export function useProfileProvider() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileProvider must be used within a ProfileProvider');
  }
  return context;
}

export default ProfileProvider;
