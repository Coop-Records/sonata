import { formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import { TrackControls, TrackMetadata } from '@/types/Track';
import Image from 'next/image';
import { useEffect } from 'react';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';

type MediaPlayerProps = {
  metadata: TrackMetadata;
  controls: TrackControls;
  position: number;
};

export default function MediaPlayer({ metadata, controls, position }: MediaPlayerProps) {
  const [player, dispatch] = usePlayer();

  const currentTrack = player?.metadata?.id === metadata.id;
  const displayPosition = currentTrack ? player.position : position;

  useEffect(() => {
    if (currentTrack) {
      dispatch({ type: 'PROGRESS', payload: { position } });
    }
  }, [position, currentTrack, dispatch]);

  const handlePlay = () => {
    dispatch({ type: 'PLAY', payload: { metadata, controls } });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE' });
  };

  return (
    <div data-type={metadata.type} className="flex w-full flex-col gap-4 rounded-lg bg-black p-2">
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
          <div className="line-clamp-2 font-inter text-sm font-bold text-white">
            {metadata.trackName}
          </div>
          <div className="line-clamp-2 font-inter text-xs font-extralight text-white">
            {metadata.artistName}
          </div>
        </div>
        <div className="my-auto">
          {currentTrack && player.playing ? (
            <button onClick={handlePause}>
              <MdPauseCircle className="text-4xl text-white" />
            </button>
          ) : (
            <button onClick={handlePlay}>
              <MdPlayCircle className="text-4xl text-white" />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between font-inter text-xs font-light text-white">
          <span>{formatDuration(displayPosition)}</span>
          <span>{formatDuration(metadata.duration)}</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-lg bg-gray-600">
          <div
            className="h-1 rounded-lg bg-white"
            style={{ width: `${(displayPosition / metadata.duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
