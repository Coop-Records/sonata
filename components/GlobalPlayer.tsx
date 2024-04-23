'use client';
import { formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';

export default function GlobalPlayer() {
  const [player, dispatch] = usePlayer();
  const { metadata, position } = player;

  console.log({ player });
  if (!metadata) return <></>;

  const handlePlay = () => {
    dispatch({ type: 'RESUME' });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE' });
  };

  return (
    <div
      data-type={metadata.type}
      className="fixed bottom-0 left-0 w-full p-2 bg-blue-500 flex flex-col gap-4"
    >
      <div className="flex gap-4">
        <img
          className="w-16 aspect-square rounded-lg shadow-md flex-shrink-0 my-auto"
          src={metadata.artworkUrl}
          alt=""
        />
        <div className="grow flex flex-col gap-1 text-left pt-2">
          <div className="text-sm font-bold text-white font-inter line-clamp-2">
            {metadata.trackName}
          </div>
          <div className="text-xs font-extralight text-white font-inter line-clamp-2">
            {metadata.artistName}
          </div>
        </div>
        <div className="my-auto">
          {player.playing ? (
            <button onClick={handlePause}>
              <MdPauseCircle className="text-white text-4xl" />
            </button>
          ) : (
            <button onClick={handlePlay}>
              <MdPlayCircle className="text-white text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-white text-xs font-light font-inter">
          <span>{formatDuration(position)}</span>
          <span>{formatDuration(metadata.duration)}</span>
        </div>
        <div className="bg-white w-full h-1 rounded-lg overflow-hidden">
          <div
            className="bg-blue-800 h-1 rounded-lg"
            style={{ width: `${(position / metadata.duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
