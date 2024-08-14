import fetchMetadata from '@/lib/fetchMetadata';
import isValidUrl from '@/lib/isValidUrl';
import { TrackMetadata } from '@/types/Track';
import { useParams, useSearchParams } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const platformIcons = {
  spotify: '/images/spotify.png',
  youtube: '/images/youtube.svg',
  soundcloud: '/images/soundcloud.png'
};

const SongContext = createContext<{
  metadata: undefined | TrackMetadata;
  alternatives: { [key: string]: string };
  platformIcons: { [key: string]: string };
  url: string;
}>({
  metadata: undefined,
  alternatives: {},
  url: '',
  platformIcons: {},
});

const SongPageProvider = ({ children }: any) => {
  const searchParams = useSearchParams();
  const songLink = useParams().songLink as string[];
  const [alternatives, setAlternative] = useState({});
  const [metadata, setMetadata] = useState<TrackMetadata>();

  useEffect(() => {
    const trackUrl = buildUrl();
    if (!isValidUrl(trackUrl)) return;

    fetchMetadata(
      trackUrl,
      { id: 1, alternativeEmbeds: [] } as any
    ).then(setMetadata);

    (async () => {
      const response = await fetch(`/api/songLink/fetchLink?trackUrl=${encodeURIComponent(trackUrl)}`);
      const data = await response.json();

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

  const buildUrl = useCallback(() => {
    let link = '';
    const query = searchParams.toString();

    if (songLink.length == 1) link = songLink[0];
    else link = songLink[0].replaceAll('%3A', ':') + '//' + songLink.slice(1).join('/');
    if (!query) return link;

    return decodeURI(`${link}?${query}`);
  }, []);

  return (
    <SongContext.Provider value={{ url: buildUrl(), alternatives, metadata, platformIcons }}>
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