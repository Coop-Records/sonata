import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useSoundcloud } from './SoundcloudProvider';
import { useSpotify } from './SpotifyProvider';
import { TrackMetadata } from '@/types/Track';
import { useSound } from './SoundProvider';
import { useYoutube } from './YoutubeProvider';
import { useZoraProvider } from './ZoraProvider';

type Player = {
  playing: boolean;
  position: number;
  duration: number;
  metadata?: TrackMetadata;
  loading: boolean;
  seekTo: number | null;
  feedId: number;
};

export type PlayerAction =
  | {
      type: 'PLAY';
      payload: {
        metadata: TrackMetadata;
        feedId: number;
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
    };

const initialState: Player = {
  playing: false,
  position: 0,
  duration: 0,
  loading: false,
  seekTo: null,
  feedId: -1,
};

const PlayerContext = createContext<[Player, Dispatch<PlayerAction>]>([initialState, () => {}]);

const playerReducer = (state: Player, action: PlayerAction) => {
  switch (action.type) {
    case 'PLAY': {
      const { metadata, feedId } = action.payload;
      return {
        ...state,
        playing: true,
        metadata,
        position: 0,
        loading: true,
        feedId,
      };
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
    case 'LOADED':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, dispatch] = useReducer(playerReducer, initialState);
  const { metadata } = player;
  const scController = useSoundcloud(dispatch);
  const soundController = useSound(dispatch);
  const spotifyController = useSpotify(dispatch);
  const youtubeController = useYoutube(dispatch);
  const zoraController = useZoraProvider(dispatch);

  const currentController = useMemo(() => {
    if (metadata?.type === 'soundcloud') return scController;
    if (metadata?.type === 'soundxyz') return soundController;
    if (metadata?.type === 'spotify') return spotifyController;
    if (metadata?.type === 'youtube') return youtubeController;
    if (metadata?.type === 'zora') return zoraController;
    return null;
  }, [
    metadata?.type,
    scController,
    soundController,
    spotifyController,
    youtubeController,
    zoraController
  ]);

  useEffect(() => {
    if (!metadata?.url || !currentController) return;
    currentController.load(metadata.url);
    return () => currentController.pause();
  }, [metadata?.url, metadata?.feedId, currentController]);

  useEffect(() => {
    if (player.loading || !currentController) return;
    if (player.playing) {
      currentController.play();
    } else {
      currentController.pause();
    }
  }, [player.loading, player.playing, currentController]);

  useEffect(() => {
    if (player.seekTo === null || !currentController) return;
    currentController.seek(player.seekTo);
    dispatch({ type: 'SEEKED' });
  }, [player.seekTo, currentController]);

  return <PlayerContext.Provider value={[player, dispatch]}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
