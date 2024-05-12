import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from 'react';
import { useSoundcloudWidget } from './SoundcloudWidgetProvider';
import { useSpotifyController } from './SpotifyControllerProvider';
import { TrackMetadata } from '@/types/Track';
import { useSoundContext } from './SoundContextProvider';

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
  const { audio } = useSoundContext(dispatch);
  const spotifyController = useSpotifyController(dispatch);

  useEffect(() => {
    if (!metadata) return;
    if (metadata.type === 'soundcloud' && metadata.url) {
      scLoad(metadata.url);

      return () => {
        scWidget.pause();
      };
    } else if (metadata.type === 'soundxyz' && metadata.url) {
      audio.src = metadata.url;

      return () => {
        audio.pause();
      };
    } else if (metadata.type === 'spotify' && spotifyController) {
      spotifyController.loadUri(metadata.url);

      return () => {
        spotifyController.pause();
      };
    }
  }, [metadata, scWidget, spotifyController, audio, scLoad]);

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
