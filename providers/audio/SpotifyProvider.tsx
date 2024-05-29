import Script from 'next/script';
import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { PlayerAction } from './PlayerProvider';
import { AudioController } from '@/types/AudioController';

const spotifyContext = createContext<any>(null);

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const portalEl = typeof document !== 'undefined' && document.getElementById('player-portal');
  const spotifyElRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<any>(null);
  const [embedController, setEmbedController] = useState(null);

  useEffect(() => {
    (window as any).onSpotifyIframeApiReady = setApi;
  }, []);

  useEffect(() => {
    if (!api) return;
    api.createController(
      spotifyElRef.current,
      { height: '100px', width: '300px', uri: 'spotify:track:51H2y6YrNNXcy3dfc3qSbA' },
      setEmbedController,
    );
  }, [api]);

  return (
    <spotifyContext.Provider value={{ embedController }}>
      <Script src="https://open.spotify.com/embed/iframe-api/v1" async />
      {children}
      {api && portalEl && createPortal(<div ref={spotifyElRef} />, portalEl)}
    </spotifyContext.Provider>
  );
}

export const useSpotify = (dispatch: Dispatch<PlayerAction>) => {
  const { embedController }: any = useContext(spotifyContext);

  useEffect(() => {
    if (!embedController) return;
    embedController.addListener('playback_update', (e: any) => {
      const {
        data: { isPaused, isBuffering, position },
      } = e;
      const loading = embedController.loading;
      const currentSrc = embedController.iframeElement.src;
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

    embedController.addListener('ready', () => {
      dispatch({ type: 'LOADED', payload: { type: 'spotify' } });
    });
  }, [embedController, dispatch]);

  const play = useCallback(() => embedController.resume(), [embedController]);
  const pause = useCallback(() => embedController.pause(), [embedController]);
  const load = useCallback((url: string) => embedController.loadUri(url), [embedController]);
  const seek = useCallback((time: number) => embedController.seek(time / 1000), [embedController]);

  const controller: AudioController = useMemo(
    () => ({ play, pause, load, seek }),
    [play, pause, load, seek],
  );
  return controller;
};
