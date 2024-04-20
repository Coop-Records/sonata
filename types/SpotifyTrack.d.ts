export type SpotifyTrack = {
  album: {
    images: {
      height: number;
      url: string;
      width: number;
    }[];
  };
  artists: {
    name: string;
  }[];
  duration_ms: number;
  name: string;
  preview_url?: string;
  uri: string;
};
