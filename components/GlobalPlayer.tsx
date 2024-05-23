'use client';
import { formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import Image from 'next/image';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import ReactSlider from 'react-slider';

export default function GlobalPlayer() {
  const [player, dispatch] = usePlayer();
  const { metadata, position } = player;

  if (!metadata) return <></>;

  const handlePlay = () => {
    dispatch({ type: 'PLAY' });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE' });
  };

  const handleSeek = (value: number) => {
    dispatch({ type: 'SEEK', payload: { position: value } });
  };

  return (
    <div
      data-type={metadata.type}
      className="sticky bottom-0 left-0 mt-auto flex w-full flex-col gap-4 border-t border-gray-200 bg-white p-2"
    >
      <div className="flex gap-4">
        <div className="relative my-auto aspect-square w-16 shrink-0 shadow-md">
          <Image
            src={metadata.artworkUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="rounded-lg"
            unoptimized
          />
        </div>

        <div className="flex grow flex-col gap-1 pt-2 text-left">
          <div className="line-clamp-2 font-inter text-sm font-bold text-black">
            {metadata.trackName}
          </div>
          <div className="line-clamp-2 font-inter text-xs font-extralight text-black">
            {metadata.artistName}
          </div>
        </div>
        <div className="my-auto">
          {player.playing ? (
            <button onClick={handlePause}>
              <MdPauseCircle className="text-4xl text-black" />
            </button>
          ) : (
            <button onClick={handlePlay}>
              <MdPlayCircle className="text-4xl text-black" />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between font-inter text-xs font-light text-black">
          <span>{formatDuration(position)}</span>
          <span>{formatDuration(player.duration)}</span>
        </div>
        <ReactSlider
          className="global-scrub h-1 w-full bg-gray-600"
          thumbClassName="global-scrub-thumb"
          trackClassName="global-scrub-track"
          value={position && player.duration ? (position / player.duration) * 100 : 0}
          onChange={(value) => handleSeek((value / 100) * player.duration)}
        />
      </div>
    </div>
  );
}
