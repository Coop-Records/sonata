import { PlayerAction } from './PlayerProvider';
import { Dispatch, useContext, createContext, useEffect, useMemo } from 'react';

const soundContext = createContext<any>(null);

export function SoundContextProvider({ children }: { children: React.ReactNode }) {
  const audio = useMemo(() => new Audio(), []);
  return <soundContext.Provider value={{ audio }}>{children}</soundContext.Provider>;
}

export const useSoundContext = (dispatch: Dispatch<PlayerAction>) => {
  const { audio }: any = useContext(soundContext);

  useEffect(() => {
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
