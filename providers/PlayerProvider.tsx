import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from 'react';
import { useSoundcloudWidget } from './SoundcloudWidgetProvider';
import { useSpotifyController } from './SpotifyControllerProvider';
import { TrackMetadata, TrackType } from '@/types/Track';
import { useSoundContext } from './SoundContextProvider';

type Player = {
  playing: boolean;
  position: number;
  duration: number;
  metadata?: TrackMetadata;
  loading: boolean;
  seekTo: number | null;
};

export type PlayerAction =
  | {
      type: 'PLAY';
      payload: {
        metadata: TrackMetadata;
      };
    }
  | {
      type: 'RESUME';
      payload: {
        id: string;
      };
    }
  | {
      type: 'PAUSE';
      payload: {
        id: string;
      };
    }
  | {
      type: 'SEEK';
      payload: {
        position: number;
      };
    }
  | {
      type: 'SEEKED';
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
      type: 'LOADED';
      payload: {
        type: TrackType;
      };
    };

const initialState: Player = {
  playing: false,
  position: 0,
  duration: 0,
  loading: false,
  seekTo: null,
};

const PlayerContext = createContext<[Player, Dispatch<PlayerAction>]>([initialState, () => {}]);

const playerReducer = (state: Player, action: PlayerAction) => {
  switch (action.type) {
    case 'PLAY': {
      const metadata = action?.payload?.metadata;
      return { ...state, playing: true, metadata, position: 0, loading: true };
    }
    case 'RESUME': {
      const { id } = action.payload;
      if (state.metadata?.id !== id) return state;
      return { ...state, playing: true };
    }
    case 'PAUSE': {
      const { id } = action.payload;
      if (state.metadata?.id !== id) return state;
      return { ...state, playing: false };
    }
    case 'SEEK':
      return { ...state, seekTo: action.payload.position };
    case 'SEEKED':
      return { ...state, seekTo: null };
    case 'PROGRESS': {
      if (state.loading) return state;
      return { ...state, position: action.payload.position };
    }
    case 'SET_DURATION':
      return { ...state, duration: action.payload.duration };
    case 'LOADED': {
      const { type } = action.payload;
      if (state.metadata?.type !== type) return state;
      return { ...state, loading: false };
    }

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
    if (metadata.type === 'soundcloud') {
      scLoad(metadata.url);
      return () => scWidget.pause();
    } else if (metadata.type === 'soundxyz') {
      audio.src = metadata.url;
      audio.load();
      return () => audio.pause();
    } else if (metadata.type === 'spotify') {
      spotifyController.loadUri(metadata.url);
      return () => {
        spotifyController.pause();
      };
    }
  }, [metadata, scWidget, spotifyController, audio, scLoad]);

  useEffect(() => {
    if (player.loading) return;
    if (metadata?.type === 'soundcloud') {
      if (player.playing) {
        try {
          scWidget.play();
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          scWidget.pause();
        } catch (e) {
          console.error(e);
        }
      }
    } else if (metadata?.type === 'soundxyz') {
      if (player.playing) {
        audio.play();
      } else {
        audio.pause();
      }
    } else if (metadata?.type === 'spotify') {
      if (player.playing) {
        spotifyController.resume();
      } else {
        spotifyController.pause();
      }
    }
  }, [player.loading, metadata?.type, player.playing, scWidget, audio, spotifyController]);

  useEffect(() => {
    if (player.seekTo === null) return;
    if (metadata?.type === 'soundcloud') {
      scWidget.seekTo(player.seekTo);
    } else if (metadata?.type === 'soundxyz') {
      audio.currentTime = player.seekTo / 1000;
    } else if (metadata?.type === 'spotify') {
      spotifyController.seek(player.seekTo / 1000);
    }
    dispatch({ type: 'SEEKED' });
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
