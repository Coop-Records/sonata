export type AudioController = {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  load: (url: string) => void;
};
