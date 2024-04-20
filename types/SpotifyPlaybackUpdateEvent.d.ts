export type SpotifyPlaybackUpdateEvent = {
  data: {
    duration: number;
    position: number;
    isPaused: boolean;
    isBuffering: boolean;
  };
};
