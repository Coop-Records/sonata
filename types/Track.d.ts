export type TrackType = 'spotify' | 'soundcloud' | 'soundxyz';

export type TrackMetadata = {
  id: string;
  type: TrackType;
  artistName: string;
  trackName: string;
  artworkUrl: string;
  url: string;
};

export type TrackControls = {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
};
