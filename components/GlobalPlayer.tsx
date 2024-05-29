'use client';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import Image from 'next/image';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import Scrubber from '@/components/Scrubber';

export default function GlobalPlayer() {
  const [player, dispatch] = usePlayer();
  const { metadata } = player;

  if (!metadata) return <></>;

  const handlePlay = () => {
    dispatch({ type: 'RESUME', payload: { id: metadata.id } });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE', payload: { id: metadata.id } });
  };

  return (
    <div
      data-type={metadata.type}
      className="sticky bottom-0 left-0 mt-auto w-screen space-y-6 bg-white py-3 shadow-2xl shadow-black"
    >
      <div className="container flex items-center gap-3">
        <div className="relative my-auto size-16 overflow-hidden rounded-lg shadow-md">
          <Image
            src={metadata.artworkUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            unoptimized
          />
        </div>

        <div className="space-y-0.5 self-center">
          <div className="line-clamp-2 text-sm font-bold">{metadata.trackName}</div>
          <div className="line-clamp-2 text-xs font-extralight text-muted-foreground">
            {metadata.artistName}
          </div>
        </div>

        <div className="ml-6 flex max-w-2xl grow flex-col items-center gap-1">
          <Button
            onClick={player.playing ? handlePause : handlePlay}
            variant="ghost"
            className="rounded-full p-0"
          >
            {player.playing ? (
              <MdPauseCircle className="text-4xl" />
            ) : (
              <MdPlayCircle className="text-4xl" />
            )}
          </Button>
          <Scrubber className="w-full max-md:hidden" />
        </div>
      </div>

      <Scrubber className="container md:hidden" />
    </div>
  );
}
