import Script from 'next/script';
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { PlayerAction } from './PlayerProvider';
import { AudioController } from '@/types/AudioController';

const youtubeContext = createContext<any>(null);

export function YoutubeProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<any>(null);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    (window as any).onYouTubeIframeAPIReady = () => {
      const anyWin = window as any;
      setApi(anyWin.YT);
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const playerPortal = document.getElementById('player-portal');
    if (!playerPortal) return;

    const playerContainer = document.createElement('div');
    playerContainer.id = 'yt-placeholder';
    playerPortal.appendChild(playerContainer);
    const player = new api.Player('yt-placeholder', {
      height: '300',
      width: '300',
    });
    setPlayer(player);

    return () => {
      player.destroy();
    };
  }, [api]);

  return (
    <youtubeContext.Provider value={{ player, api }}>
      <Script src="https://www.youtube.com/iframe_api" />
      {children}
    </youtubeContext.Provider>
  );
}

export const useYoutube = (dispatch: Dispatch<PlayerAction>) => {
  const { player, api }: any = useContext(youtubeContext);

  useEffect(() => {
    if (!(player && api)) return;

    let progressPoll: ReturnType<typeof setInterval>;

    player.addEventListener('onStateChange', (event: any) => {
      if (event.data === api.PlayerState.PLAYING) {
        progressPoll = setInterval(() => {
          const position = player.getCurrentTime() * 1000;
          dispatch({ type: 'PROGRESS', payload: { position } });
        }, 1000);
        return;
      }
      clearInterval(progressPoll);
      if (event.data === api.PlayerState.CUED) {
        dispatch({ type: 'LOADED' });
        dispatch({ type: 'SET_DURATION', payload: { duration: player.getDuration() * 1000 } });
      }
    });
  }, [player, dispatch, api]);

  const load = useCallback(
    (videoId: string) => {
      if (!player) return;
      player.cueVideoById(videoId);
    },
    [player],
  );
  const play = useCallback(() => player.playVideo(), [player]);
  const pause = useCallback(() => player.pauseVideo(), [player]);
  const seek = useCallback((time: number) => player.seekTo(time / 1000, true), [player]);

  const controller: AudioController = useMemo(
    () => ({ play, pause, load, seek }),
    [play, pause, load, seek],
  );

  return controller;
};
