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
    <div data-type={metadata.type} className="w-full rounded-lg p-2 bg-black flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-16 aspect-square shadow-md flex-shrink-0 my-auto relative">
          <Image
            src={metadata.artworkUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="rounded-lg"
            unoptimized
          />
        </div>

        <div className="grow flex flex-col gap-1 text-left pt-2">
          <div className="text-sm font-bold text-white font-inter line-clamp-2">
            {metadata.trackName}
          </div>
          <div className="text-xs font-extralight text-white font-inter line-clamp-2">
            {metadata.artistName}
          </div>
        </div>
        <div className="my-auto">
          {currentTrack && player.playing ? (
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
          <span>{formatDuration(displayPosition)}</span>
          <span>{formatDuration(metadata.duration)}</span>
        </div>
        <div className="bg-gray-600 w-full h-1 rounded-lg overflow-hidden">
          <div
            className="bg-white h-1 rounded-lg"
            style={{ width: `${(displayPosition / metadata.duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
