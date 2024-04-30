import { TrackControls, TrackMetadata } from '@/types/Track';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';

type Player = {
  playing: boolean;
  position: number;
  metadata?: TrackMetadata;
  controls: TrackControls;
};

type PlayerAction =
  | {
      type: 'PLAY';
      payload: {
        metadata: TrackMetadata;
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
};

const PlayerContext = createContext<[Player, Dispatch<PlayerAction>]>([initialState, () => {}]);

const playerReducer = (state: Player, action: PlayerAction) => {
  switch (action.type) {
    case 'PLAY': {
      const { metadata, controls } = action.payload;
      if (state?.metadata?.id === metadata.id) {
        state.controls.play();
        return { ...state, playing: true };
      } else {
        state.controls.pause();
        // state?.onSeek(0);
        controls.play();
        return { ...state, playing: true, metadata, controls };
      }
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
