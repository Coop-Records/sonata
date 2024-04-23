import { formatDuration } from '@/lib/utils';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';

type CustomEmbedProps = {
  artistName: string;
  trackName: string;
  artworkUrl: string;
  onPlay: () => void;
  onPause: () => void;
  playing?: boolean;
  position: number;
  duration: number;
};

export default function CustomEmbed({
  artistName,
  artworkUrl,
  trackName,
  onPlay,
  onPause,
  playing,
  position,
  duration,
}: CustomEmbedProps) {
  return (
    <div className="w-full rounded-lg p-2 bg-blue-500 flex flex-col gap-4">
      <div className="flex gap-4">
        <img
          className="w-16 aspect-square rounded-lg shadow-md flex-shrink-0 my-auto"
          src={artworkUrl}
          alt=""
        />
        <div className="grow flex flex-col gap-1 text-left pt-2">
          <div className="text-sm font-bold text-white font-inter line-clamp-2">{trackName}</div>
          <div className="text-xs font-extralight text-white font-inter line-clamp-2">
            {artistName}
          </div>
        </div>
        <div className="my-auto">
          {playing ? (
            <button onClick={onPause}>
              <MdPauseCircle className="text-white text-4xl" />
            </button>
          ) : (
            <button onClick={onPlay}>
              <MdPlayCircle className="text-white text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-white text-xs font-light font-inter">
          <span>{formatDuration(position)}</span>
          <span>{formatDuration(duration)}</span>
        </div>
        <div className="bg-white w-full h-1 rounded-lg overflow-hidden">
          <div
            className="bg-blue-800 h-1 rounded-lg"
            style={{ width: `${(position / duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
