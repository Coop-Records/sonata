import { PlayerAction } from './PlayerProvider';
import { Dispatch, useContext, createContext, useEffect, useState } from 'react';

const soundContext = createContext<any>(null);

export function SoundContextProvider({ children }: { children: React.ReactNode }) {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  return <soundContext.Provider value={{ audio }}>{children}</soundContext.Provider>;
}

export const useSoundContext = (dispatch: Dispatch<PlayerAction>) => {
  const { audio }: any = useContext(soundContext);

  useEffect(() => {
    if (!audio) return;
    audio.ontimeupdate = () => {
      dispatch({ type: 'PROGRESS', payload: { position: audio.currentTime * 1000 } });
    };
    audio.oncanplay = () => {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      dispatch({ type: 'SET_DURATION', payload: { duration: audio.duration * 1000 } });
    };
  }, [audio, dispatch]);

  return { audio };
};
