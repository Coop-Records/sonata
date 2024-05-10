export type TrackMetadata = {
  id: string;
  type: 'spotify' | 'soundcloud' | 'soundxyz';
  artistName: string;
  trackName: string;
  artworkUrl: string;
  iframeSrc?: string;
  audioSrc?: string;
};

export type TrackControls = {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
};
