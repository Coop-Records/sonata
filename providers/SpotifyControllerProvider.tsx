import Script from 'next/script';
import { Dispatch, createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PlayerAction } from './PlayerProvider';

const spotifyControllerContext = createContext<any>(null);

export function SpotifyControllerProvider({ children }: { children: React.ReactNode }) {
  const portalEl = typeof document !== 'undefined' && document.getElementById('player-portal');
  const spotifyElRef = useRef<HTMLDivElement>(null);
  const [spotifyApi, setSpotifyApi] = useState<any>(null);
  const [spotifyController, setSpotifyController] = useState(null);

  useEffect(() => {
    (window as any).onSpotifyIframeApiReady = setSpotifyApi;
  }, []);

  useEffect(() => {
    if (!spotifyApi) return;
    spotifyApi.createController(
      spotifyElRef.current,
      { height: '100px', width: '100px' },
      setSpotifyController,
    );
  }, [spotifyApi]);

  return (
    <spotifyControllerContext.Provider value={{ spotifyController }}>
      <Script src="https://open.spotify.com/embed/iframe-api/v1" async />
      {children}
      {spotifyApi && portalEl && createPortal(<div ref={spotifyElRef} />, portalEl)}
    </spotifyControllerContext.Provider>
  );
}

export const useSpotifyController = (dispatch: Dispatch<PlayerAction>) => {
  const { spotifyController }: any = useContext(spotifyControllerContext);

  useEffect(() => {
    if (!spotifyController) return;
    spotifyController.addListener('playback_update', (e: any) => {
      dispatch({ type: 'PROGRESS', payload: { position: e.data.position } });
      dispatch({ type: 'SET_DURATION', payload: { duration: 30 * 1000 } });
    });

    spotifyController.addListener('ready', () => {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    });
  }, [spotifyController, dispatch]);
  return spotifyController;
};
