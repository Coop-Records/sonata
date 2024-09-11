import useSongPage from '@/hooks/useSongPage';
import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';
import { SupabasePost } from '@/types/SupabasePost';
import { TrackMetadata } from '@/types/Track';
import { createContext, useContext } from 'react';

const SongContext = createContext<{
  metadata?: TrackMetadata;
  alternatives: { [key: string]: string };
  totalNotes?: number;
  collection?: CollectionObject;
  songLink: string;
  posts: SupabasePost[];
  postsLoading: boolean;
}>({
  alternatives: {},
  songLink: '',
  totalNotes: 0,
  collection: undefined,
  posts: [],
  postsLoading: true,
});

const SongPageProvider = ({ children }: any) => {
  const data = useSongPage();

  return <SongContext.Provider value={data}>{children}</SongContext.Provider>;
};

export const useSongPageProvider = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongPageProvider must be used within a SongPageProvider');
  }
  return context;
};

export default SongPageProvider;
