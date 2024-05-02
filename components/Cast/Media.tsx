import useMedia from '@/hooks/useMedia';
import { formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import Image from 'next/image';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';

export default function Media({ trackUrl }: { trackUrl: string }) {
  const { metadata, handlePause, handlePlay, duration, iframeRef, iframeSrc } = useMedia({
    trackUrl,
  });
  const [player] = usePlayer();
  const { position } = player;
  const currentTrack = player?.metadata?.id === metadata?.id;

  if (!metadata) return <></>;

  return (
    <>
      <div
        data-type={metadata.type}
        className="sticky bottom-0 left-0 flex w-full flex-col gap-4 p-2 rounded-lg border"
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
            {currentTrack && player.playing ? (
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
            <span>{formatDuration(metadata.duration || duration)}</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-lg bg-gray-600">
            <div
              className="h-1 rounded-lg bg-white"
              style={{ width: `${(position / (metadata.duration || duration)) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <iframe
        className="hidden"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={iframeSrc}
        ref={iframeRef}
      />
    </>
  );
}
