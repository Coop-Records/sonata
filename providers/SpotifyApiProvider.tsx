import useSpotifyController from '@/hooks/useSpotifyController';
import Script from 'next/script';
import { createContext, useContext, useMemo } from 'react';

const spotifyApiContext = createContext(null);

export function SpotifyApiProvider({ children }: { children: React.ReactNode }) {
  const { embedController, iframeRef } = useSpotifyController();
  // useEffect(() => {
  //   (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
  //     console.log('SWEETS API to CONTROLLER', IFrameAPI);
  //   };
  // }, []);
  const value = useMemo(
    () =>
      ({
        iframeRef,
      }) as any,
    [iframeRef],
  );
  return (
    <spotifyApiContext.Provider value={value as any}>
      <Script src="https://open.spotify.com/embed/iframe-api/v1" async />
      {children}
    </spotifyApiContext.Provider>
  );
}

export const useSpotifyProvider = () => useContext(spotifyApiContext) as any;
