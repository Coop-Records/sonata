import Script from 'next/script';
import { createContext, useContext, useEffect, useState } from 'react';

const spotifyApiContext = createContext(null);

export function SpotifyApiProvider({ children }: { children: React.ReactNode }) {
  const [spotifyApi, setSpotifyApi] = useState(null);

  useEffect(() => {
    (window as any).onSpotifyIframeApiReady = setSpotifyApi;
  }, []);
  return (
    <spotifyApiContext.Provider value={spotifyApi}>
      <Script src="https://open.spotify.com/embed/iframe-api/v1" async />
      {children}
    </spotifyApiContext.Provider>
  );
}

export const useSpotifyApi = () => useContext(spotifyApiContext) as any;
