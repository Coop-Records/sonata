import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useSoundcloudWidget } from './SoundcloudWidgetProvider';
import { useSpotifyController } from './SpotifyControllerProvider';
import { TrackMetadata } from '@/types/Track';

type Player = {
  playing: boolean;
  position: number;
  duration: number;
  metadata?: TrackMetadata;
  loading: boolean;
  seekTo?: number;
};

export type PlayerAction =
  | {
      type: 'PLAY';
      payload?: {
        metadata: TrackMetadata;
      };
    }
  | {
      type: 'PAUSE';
    }
  | {
      type: 'SEEK';
      payload: {
        position: number;
      };
    }
  | {
      type: 'PROGRESS';
      payload: {
        position: number;
      };
    }
  | {
      type: 'SET_DURATION';
      payload: {
        duration: number;
      };
    }
  | {
      type: 'SET_LOADING';
      payload: {
        loading: boolean;
      };
    };

const initialState: Player = {
  playing: false,
  position: 0,
  duration: 0,
  loading: false,
};

const PlayerContext = createContext<[Player, Dispatch<PlayerAction>]>([initialState, () => {}]);

const playerReducer = (state: Player, action: PlayerAction) => {
  switch (action.type) {
    case 'PLAY': {
      const metadata = action?.payload?.metadata;
      if (!metadata || state?.metadata?.id === metadata.id) {
        return { ...state, playing: true };
      } else {
        return { ...state, playing: true, metadata, position: 0, loading: true };
      }
    }
    case 'PAUSE':
      return { ...state, playing: false };
    case 'SEEK':
      return { ...state, seekTo: action.payload.position };
    case 'PROGRESS': {
      if (state.loading) return state;
      return { ...state, position: action.payload.position };
    }
    case 'SET_DURATION':
      return { ...state, duration: action.payload.duration };
    case 'SET_LOADING':
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
};

export default function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, dispatch] = useReducer(playerReducer, initialState);
  const { metadata } = player;

  const { scWidget, scLoad } = useSoundcloudWidget(dispatch);

  const [audio, setAudio] = useState<HTMLAudioElement>();

  const spotifyController = useSpotifyController(dispatch);

  useEffect(() => {
    if (!metadata) return;
    if (metadata.type === 'soundcloud' && metadata.iframeSrc) {
      scLoad(metadata.iframeSrc);

      return () => {
        try {
          scWidget?.pause();
          scLoad(null);
        } catch (e) {
          console.log(e);
        }
      };
    } else if (metadata.type === 'soundxyz') {
      if (!metadata.audioSrc) return;
      const audio = new Audio(metadata.audioSrc);
      audio.preload = 'none';
      audio.ontimeupdate = () =>
        dispatch({ type: 'PROGRESS', payload: { position: audio.currentTime * 1000 } });
      setAudio(audio);
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });

      return () => {
        audio.pause();
      };
    } else if (metadata.type === 'spotify') {
      if (!spotifyController) return;
      spotifyController.loadUri(`spotify:track:${metadata.id}`);

      return () => {
        spotifyController.pause();
      };
    }
  }, [metadata, scWidget, spotifyController, scLoad]);

  useEffect(() => {
    if (player.loading) return;
    if (metadata?.type === 'soundcloud' && scWidget) {
      if (player.playing) {
        scWidget.play();
      } else {
        scWidget.pause();
      }
    } else if (metadata?.type === 'soundxyz' && audio) {
      if (player.playing) {
        audio.play();
      } else {
        audio.pause();
      }
    } else if (metadata?.type === 'spotify' && spotifyController) {
      spotifyController.togglePlay();
    }
  }, [player.loading, metadata?.type, player.playing, scWidget, audio, spotifyController]);

  useEffect(() => {
    if (typeof player.seekTo === 'undefined') return;
    if (metadata?.type === 'soundcloud' && scWidget) {
      scWidget.seekTo(player.seekTo);
    } else if (metadata?.type === 'soundxyz' && audio) {
      audio.currentTime = player.seekTo / 1000;
    } else if (metadata?.type === 'spotify' && spotifyController) {
      spotifyController.seek(player.seekTo / 1000);
    }
  }, [player.seekTo, metadata?.type, scWidget, audio, spotifyController]);

  return <PlayerContext.Provider value={[player, dispatch]}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
