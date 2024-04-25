export type TrackMetadata = {
  id: string;
  type: 'spotify' | 'soundcloud' | 'soundxyz';
  artistName: string;
  trackName: string;
  artworkUrl: string;
  duration: number;
};

export type TrackControls = {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
};
