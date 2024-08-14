import fetchMetadata from '@/lib/fetchMetadata';
import isValidUrl from '@/lib/isValidUrl';
import { supabaseClient } from '@/lib/supabase/client';
import { TrackMetadata } from '@/types/Track';
import { isEmpty } from 'lodash';
import { useParams, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type TObject = { [key: string]: string };

const platformIcons = {
  spotify: '/images/spotify.png',
  youtube: '/images/youtube.svg',
  soundcloud: '/images/soundcloud.png'
};

const SongContext = createContext<{
  metadata?: TrackMetadata;
  alternatives: TObject;
  platformIcons: TObject;
  totalNotes?: number;
  trackUrl: string;
}>({
  alternatives: {},
  trackUrl: '',
  platformIcons: {},
});

const SongPageProvider = ({ children }: any) => {
  const searchParams = useSearchParams();
  const songLink = useParams().songLink as string[];
  const [alternatives, setAlternative] = useState<TObject>({});
  const [metadata, setMetadata] = useState<TrackMetadata>();
  const [totalNotes, setTotalNotes] = useState<number>();

  const trackUrl = useMemo(() => {
    let link = '';
    const query = searchParams.toString();

    if (songLink.length == 1) link = songLink[0];
    else link = songLink[0].replaceAll('%3A', ':') + '//' + songLink.slice(1).join('/');
    if (!query) return link;

    return decodeURI(`${link}?${query}`);
  }, []);

  useEffect(() => {
    if (!isValidUrl(trackUrl)) return;

    fetchMetadata(
      trackUrl,
      { id: (new Date()).getTime(), alternativeEmbeds: [] } as any
    ).then(setMetadata);

    (async () => {
      const response = await fetch(`/api/songLink/fetchLink?trackUrl=${encodeURIComponent(trackUrl)}`);
      if (!response.ok) return;
      const data = await response.json();
      if (!data) return;

      setAlternative(() => {
        const platforms: any = {};
        for (const [name, value] of Object.entries<any>(data.linksByPlatform)) {
          if (!['spotify', 'youtube', 'soundcloud'].includes(name)) continue;
          platforms[name] = value.url;
        }

        return platforms;
      });
    })();
  }, []);

  useEffect(() => {
    if (isEmpty(alternatives)) return;

    const embeds = Object.values(alternatives).concat(trackUrl);
    supabaseClient
      .rpc('total_posts_points_of_embeds', { search_embeds: embeds })
      .then(({ data }) => {
        if (data) setTotalNotes(data);
      });
  }, [alternatives]);

  return (
    <SongContext.Provider value={{ trackUrl, alternatives, metadata, platformIcons, totalNotes }}>
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