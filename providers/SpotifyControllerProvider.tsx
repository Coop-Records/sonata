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
      { height: '100px', width: '300px', uri: 'spotify:track:51H2y6YrNNXcy3dfc3qSbA' },
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
      const {
        data: { isPaused, isBuffering, position },
      } = e;
      const loading = spotifyController.loading;
      const currentSrc = spotifyController.iframeElement.src;
      const trackId = currentSrc.split('?')[0].split('/').pop();

      if (!isBuffering && !loading) {
        if (isPaused) {
          dispatch({ type: 'PAUSE', payload: { id: trackId } });
        } else {
          dispatch({ type: 'RESUME', payload: { id: trackId } });
        }
      }
      dispatch({ type: 'PROGRESS', payload: { position } });
      if (position === 0) {
        dispatch({ type: 'SET_DURATION', payload: { duration: 30 * 1000 } });
      }
    });

    spotifyController.addListener('ready', () => {
      dispatch({ type: 'LOADED', payload: { type: 'spotify' } });
    });
  }, [spotifyController, dispatch]);
  return spotifyController;
};
