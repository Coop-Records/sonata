import Script from 'next/script';
import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PlayerAction } from './PlayerProvider';
import { AudioController } from '@/types/AudioController';

const spotifyContext = createContext<any>(null);

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [api, setApi] = useState<any>(null);
  const [embedController, setEmbedController] = useState<any>(null);

  useEffect(() => {
    (window as any).onSpotifyIframeApiReady = setApi;
  }, []);

  useEffect(() => {
    if (!api || embedController) return;
    const playerPortal = document.getElementById('player-portal');
    if (!playerPortal) return;
    const playerContainer = document.createElement('div');
    playerContainer.id = 'spotify-placeholder';
    playerPortal.appendChild(playerContainer);
    api.createController(
      playerContainer,
      { height: '100px', width: '300px', uri: 'spotify:track:51H2y6YrNNXcy3dfc3qSbA' },
      setEmbedController,
    );

    return () => {
      embedController?.destroy();
    };
  }, [api, embedController]);

  return (
    <spotifyContext.Provider value={{ embedController }}>
      <Script src="https://open.spotify.com/embed/iframe-api/v1" async />
      {children}
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
      dispatch({ type: 'LOADED' });
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
