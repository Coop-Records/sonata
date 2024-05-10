import Script from 'next/script';
import { Dispatch, createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PlayerAction } from './PlayerProvider';

const soundcloudWidgetContext = createContext<any>(null);

export function SoundcloudWidgetProvider({ children }: { children: React.ReactNode }) {
  const portalEl = typeof document !== 'undefined' && document.getElementById('player-portal');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  const [soundcloudApi, setSoundcloudApi] = useState<any>(null);
  const [soundcloudWidget, setSoundcloudWidget] = useState(null);

  useEffect(() => {
    if (!(soundcloudApi && src)) return;
    const iframe = iframeRef.current;
    const widget = soundcloudApi.Widget(iframe);
    setSoundcloudWidget(widget);
  }, [soundcloudApi, src]);

  return (
    <soundcloudWidgetContext.Provider value={{ soundcloudWidget, soundcloudApi, src, setSrc }}>
      <Script
        src="https://w.soundcloud.com/player/api.js"
        async
        onLoad={() => {
          setSoundcloudApi((window as any).SC);
        }}
      />
      {children}
      {soundcloudApi &&
        portalEl &&
        src &&
        createPortal(
          <iframe scrolling="no" frameBorder="no" allow="autoplay" ref={iframeRef} src={src} />,
          portalEl,
        )}
    </soundcloudWidgetContext.Provider>
  );
}

export const useSoundcloudWidget = (dispatch: Dispatch<PlayerAction>) => {
  const { soundcloudApi, soundcloudWidget, setSrc }: any = useContext(soundcloudWidgetContext);

  useEffect(() => {
    if (!soundcloudWidget) return;
    soundcloudWidget.bind(soundcloudApi.Widget.Events.READY, function () {
      soundcloudWidget.bind(soundcloudApi.Widget.Events.PLAY_PROGRESS, (position: any) => {
        dispatch({ type: 'PROGRESS', payload: { position: position.currentPosition } });
      });

      soundcloudWidget.getDuration((duration: number) => {
        dispatch({ type: 'SET_DURATION', payload: { duration } });
      });
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    });
  }, [soundcloudWidget, soundcloudApi, dispatch]);

  return { scWidget: soundcloudWidget, scLoad: setSrc };
};
