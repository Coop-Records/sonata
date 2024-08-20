import { TrackMetadata } from "./Track";

export enum EPlayer {
  Next = 'global-player:next',
  Prev = 'global-player:previous',
  End = 'global-player:completed',
}

export type EventPlayer = CustomEvent<TrackMetadata | undefined>;

export interface IGlobalPlayerEventMap {
  [EPlayer.Next]: EventPlayer;
  [EPlayer.Prev]: EventPlayer;
  [EPlayer.End]: EventPlayer;
}

export const GlobalPlayerId = 'global-player';