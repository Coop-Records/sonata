import { AudioController } from '@/types/AudioController';
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { PlayerAction } from './PlayerProvider';

const ZoraContext = createContext<HTMLAudioElement | null>(null);

export function ZoraProvider({ children }: { children: React.ReactNode }) {
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio : null);

  return <ZoraContext.Provider value={audio}>{children}</ZoraContext.Provider>;
}

export const useZoraProvider = (dispatch: Dispatch<PlayerAction>): AudioController => {
  const audio = useContext(ZoraContext)!;

  useEffect(() => {
    const ontimeupdate = () => {
      dispatch({ type: 'PROGRESS', payload: { position: audio.currentTime * 1000 } });
    };
    const oncanplay = () => {
      dispatch({ type: 'LOADED' });
      dispatch({ type: 'SET_DURATION', payload: { duration: audio.duration * 1000 } });
    };

    audio.addEventListener('timeupdate', ontimeupdate);
    audio.addEventListener('canplay', oncanplay);

    return () => {
      audio.removeEventListener('timeupdate', ontimeupdate);
      audio.removeEventListener('canplay', oncanplay);
    }
  }, [audio, dispatch]);

  return useMemo(() => ({
    play: () => audio.play(),
    pause: () => audio.pause(),
    load: (url: string) => { audio.src = url; audio.load() },
    seek: (time: number) => audio.currentTime = time / 1000,
  }), [audio]);
};
