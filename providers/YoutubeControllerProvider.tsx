import Script from 'next/script';
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { PlayerAction } from './PlayerProvider';
const youtubePlayerContext = createContext<any>(null);
const dummySrc = 'https://www.youtube.com/embed/ndl9OClJjXo?si=iRZ4uhL6_xZtKdw3';

export function YouTubePlayerProvider({ children }: { children: React.ReactNode }) {
  const portalEl = typeof document !== 'undefined' && document.getElementById('player-portal');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [youtubeApiReady, setYoutubeApiReady] = useState(false);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);

  useEffect(() => {
    if (!youtubeApiReady || !iframeRef.current) return;
    const intervalId = setInterval(() => {
      const anyWin = window as any;
      if (anyWin.YT && anyWin.YT.Player) {
        const iframe = iframeRef.current;
        const player = new anyWin.YT.Player(iframe, {
          height: '0',
          width: '0',
          events: {
            onReady: (event: any) => event.target.pauseVideo(),
            onStateChange: (event: any) => {
              if (event.data === anyWin.YT.PlayerState.PLAYING) {
                // Handle video playing state
              }
            },
          },
        });
        setYoutubePlayer(player);
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [youtubeApiReady]);

  return (
    <youtubePlayerContext.Provider value={{ youtubePlayer }}>
      <Script src="https://www.youtube.com/iframe_api" onLoad={() => setYoutubeApiReady(true)} />
      {children}
      {portalEl &&
        createPortal(<iframe allow="autoplay" ref={iframeRef} src={dummySrc} />, portalEl)}
    </youtubePlayerContext.Provider>
  );
}

export const useYouTubePlayer = (dispatch: Dispatch<PlayerAction>) => {
  const { youtubePlayer, youtubeApi }: any = useContext(youtubePlayerContext);

  const youtubeLoad = useCallback(
    (videoId: string) => {
      if (youtubePlayer) {
        youtubePlayer.loadVideoById(videoId);
        youtubePlayer.playVideo();
        youtubePlayer.addEventListener('onStateChange', (event: any) => {
          if (event.data === youtubeApi.PlayerState.PLAYING) {
            dispatch({ type: 'LOADED', payload: { type: 'youtube' } });
            const duration = youtubePlayer.getDuration() * 1000;
            dispatch({ type: 'SET_DURATION', payload: { duration } });
          }
        });
      }
    },
    [dispatch, youtubePlayer],
  );

  return { ytPlayer: youtubePlayer, ytLoad: youtubeLoad };
};
