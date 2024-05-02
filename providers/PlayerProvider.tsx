import { TrackControls, TrackMetadata } from '@/types/Track';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';

type Player = {
  playing: boolean;
  position: number;
  metadata?: TrackMetadata;
  controls: TrackControls;
  status?: string;
};

type PlayerAction =
  | {
      type: 'LOAD_METADATA';
      payload: {
        metadata: TrackMetadata;
      };
    }
  | {
      type: 'PLAY';
      payload: {
        controls: TrackControls;
      };
    }
  | {
      type: 'PAUSE';
    }
  | {
      type: 'PROGRESS';
      payload: {
        position: number;
      };
    }
  | {
      type: 'RESUME';
    };

const initialState: Player = {
  playing: false,
  position: 0,
  controls: {
    play: () => {},
    pause: () => {},
    seek: () => {},
  },
  status: 'LOADED_METADATA',
};

const PlayerContext = createContext<[Player, Dispatch<PlayerAction>]>([initialState, () => {}]);

const playerReducer = (state: Player, action: PlayerAction) => {
  switch (action.type) {
    case 'LOAD_METADATA': {
      const { metadata } = action.payload;
      return { ...state, metadata, status: 'LOADED_METADATA' };
    }
    case 'PLAY': {
      const { controls } = action.payload;
      state.controls.pause();
      controls.play();
      return { ...state, playing: true, controls, status: 'PLAYED' };
    }
    case 'PAUSE':
      state.controls.pause();
      return { ...state, playing: false };
    case 'PROGRESS':
      return { ...state, position: action.payload.position };
    case 'RESUME':
      state.controls.play();
      return { ...state, playing: true };

    default:
      return state;
  }
};

export default function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  return <PlayerContext.Provider value={[state, dispatch]}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
