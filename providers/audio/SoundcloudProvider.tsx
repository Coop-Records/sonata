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

const dummySrc = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/293';
const soundcloudContext = createContext<any>(null);

export function SoundcloudProvider({ children }: { children: React.ReactNode }) {
  const [api, setApi] = useState<any>(null);
  const [widget, setWidget] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    let iframe: any = document.getElementById('sc-iframe');
    if (!iframe) {
      const playerPortal = document.getElementById('player-portal');
      if (!playerPortal) return;

      iframe = document.createElement('iframe');
      iframe.id = 'sc-iframe';
      iframe.allow = 'autoplay';
      iframe.src = dummySrc;
      playerPortal.appendChild(iframe);
    }
    const widget = api.Widget('sc-iframe');
    setWidget(widget);
  }, [api]);

  return (
    <soundcloudContext.Provider value={{ widget, api }}>
      <Script
        src="https://w.soundcloud.com/player/api.js"
        async
        onLoad={() => {
          setApi((window as any).SC);
        }}
      />
      {children}
    </soundcloudContext.Provider>
  );
}

export const useSoundcloud = (dispatch: Dispatch<PlayerAction>) => {
  const { api, widget }: any = useContext(soundcloudContext);

  useEffect(() => {
    if (!widget) return;
    widget.bind(api.Widget.Events.READY, () => {
      widget.bind(api.Widget.Events.PLAY_PROGRESS, (position: any) => {
        dispatch({ type: 'PROGRESS', payload: { position: position.currentPosition } });
      });

      widget.bind(api.Widget.Events.ERROR, (e: any) => {
        console.error('error', e);
      });

      widget.bind(api.Widget.Events.PAUSE, (e: any) => {
        dispatch({ type: 'PAUSE', payload: { id: String(e.soundId) } });
      });
    });
  }, [widget, api, dispatch]);

  const load = useCallback(
    (src: string) => {
      widget.load(src, {
        callback() {
          widget.getDuration((duration: number) => {
            dispatch({ type: 'SET_DURATION', payload: { duration } });
          });
          dispatch({ type: 'LOADED' });
        },
      });
    },
    [dispatch, widget],
  );

  const play = useCallback(() => widget.play(), [widget]);
  const pause = useCallback(() => widget.pause(), [widget]);
  const seek = useCallback((time: number) => widget.seekTo(time), [widget]);
  const controller: AudioController = useMemo(
    () => ({ play, pause, load, seek }),
    [play, pause, load, seek],
  );
  return controller;
};
