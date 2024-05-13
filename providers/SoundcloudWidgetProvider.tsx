import Script from 'next/script';
import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { PlayerAction } from './PlayerProvider';

const soundcloudWidgetContext = createContext<any>(null);
const dummySrc = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/293';

export function SoundcloudWidgetProvider({ children }: { children: React.ReactNode }) {
  const portalEl = typeof document !== 'undefined' && document.getElementById('player-portal');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [soundcloudApi, setSoundcloudApi] = useState<any>(null);
  const [soundcloudWidget, setSoundcloudWidget] = useState<any>(null);

  useEffect(() => {
    if (!soundcloudApi) return;
    const iframe = iframeRef.current;
    const widget = soundcloudApi.Widget(iframe);
    setSoundcloudWidget(widget);
  }, [soundcloudApi]);

  return (
    <soundcloudWidgetContext.Provider value={{ soundcloudWidget, soundcloudApi }}>
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
        createPortal(
          <iframe
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            ref={iframeRef}
            src={dummySrc}
          />,
          portalEl,
        )}
    </soundcloudWidgetContext.Provider>
  );
}

export const useSoundcloudWidget = (dispatch: Dispatch<PlayerAction>) => {
  const { soundcloudApi, soundcloudWidget }: any = useContext(soundcloudWidgetContext);

  useEffect(() => {
    if (!soundcloudWidget) return;
    soundcloudWidget.bind(soundcloudApi.Widget.Events.READY, function () {
      soundcloudWidget.bind(soundcloudApi.Widget.Events.PLAY_PROGRESS, (position: any) => {
        dispatch({ type: 'PROGRESS', payload: { position: position.currentPosition } });
      });
    });
  }, [soundcloudWidget, soundcloudApi, dispatch]);

  const soundcloudLoad = useCallback(
    (src: string) => {
      soundcloudWidget.load(src, {
        callback() {
          soundcloudWidget.getDuration((duration: number) => {
            dispatch({ type: 'SET_DURATION', payload: { duration } });
          });
          dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        },
      });
    },
    [dispatch, soundcloudWidget],
  );

  return { scWidget: soundcloudWidget, scLoad: soundcloudLoad };
};
