import { AudioController } from '@/types/AudioController';
import { PlayerAction } from './PlayerProvider';
import {
  Dispatch,
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

type SoundContext = {
  audio: HTMLAudioElement | undefined;
};

const soundContext = createContext<SoundContext>({ audio: undefined });

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  return <soundContext.Provider value={{ audio }}>{children}</soundContext.Provider>;
}

export const useSound = (dispatch: Dispatch<PlayerAction>) => {
  const { audio } = useContext(soundContext);

  useEffect(() => {
    if (!audio) return;
    audio.ontimeupdate = () => {
      dispatch({ type: 'PROGRESS', payload: { position: audio.currentTime * 1000 } });
    };
    audio.oncanplay = () => {
      dispatch({ type: 'LOADED' });
      dispatch({ type: 'SET_DURATION', payload: { duration: audio.duration * 1000 } });
    };
  }, [audio, dispatch]);

  const play = useCallback(() => audio && audio.play(), [audio]);
  const pause = useCallback(() => audio && audio.pause(), [audio]);
  const load = useCallback(
    (url: string) => {
      if (!audio) return;
      audio.src = url;
      audio.load();
    },
    [audio],
  );
  const seek = useCallback(
    (time: number) => {
      if (!audio) return;
      audio.currentTime = time / 1000;
    },
    [audio],
  );

  const controller: AudioController = useMemo(
    () => ({ play, pause, load, seek }),
    [play, pause, load, seek],
  );
  return controller;
};
