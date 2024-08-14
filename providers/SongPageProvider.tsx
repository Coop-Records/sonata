import useSongPage from '@/hooks/useSongPage';
import { TrackMetadata } from '@/types/Track';
import { createContext, useContext } from 'react';

const SongContext = createContext<{
  metadata?: TrackMetadata;
  alternatives: { [key: string]: string };
  totalNotes?: number;
  songLink: string;
}>({
  alternatives: {},
  songLink: '',
});

const SongPageProvider = ({ children }: any) => {
  const data = useSongPage();

  return (
    <SongContext.Provider value={data}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongPageProvider = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongPageProvider must be used within a SongPageProvider');
  }
  return context;
};

export default SongPageProvider;