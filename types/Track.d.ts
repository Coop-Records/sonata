import { CONTENT_PLATFORMS } from '@/lib/consts';

export type TrackType = (typeof CONTENT_PLATFORMS)[number]['title'];

export type TrackMetadata = {
  id: string;
  type: TrackType;
  artistName: string;
  trackName: string;
  artworkUrl: string;
  url: string;
  feedId: number;
};

export type TrackControls = {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
};
