'use client';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import Image from 'next/image';
import Scrubber from '@/components/Scrubber';
import PlayerButtons from './PlayerButtons';
import { Button } from './ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function GlobalPlayer() {
  const [player, dispatch] = usePlayer();
  const { metadata } = player;

  if (!metadata) return <></>;

  return (
    <div
      data-type={metadata.type}
      className="sticky bottom-0 left-0 mt-auto w-screen space-y-6 overflow-hidden bg-white py-3 shadow-2xl shadow-black"
    >
      <div className="container relative flex items-center gap-3">
        <Button
          variant="ghost"
          className="h-auto rounded-full p-2"
          onClick={() => dispatch({ type: 'STOP' })}
        >
          <Cross1Icon />
        </Button>
        <div className="relative my-auto size-16 overflow-hidden rounded-lg shadow-md">
          <Image
            src={metadata.artworkUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            unoptimized
          />
        </div>

        <div className="max-w-[33%] space-y-0.5 self-center">
          <div className="line-clamp-2 text-sm font-bold">{metadata.trackName}</div>
          <div className="line-clamp-2 text-xs font-extralight text-muted-foreground">
            {metadata.artistName}
          </div>
        </div>
        <div className="absolute left-1/4 w-full">
          <div className="ml-6 flex max-w-2xl grow flex-col items-center gap-1">
            <PlayerButtons metadata={metadata} />
            <Scrubber className="w-full max-md:hidden" />
          </div>
        </div>
      </div>

      <Scrubber className="container md:hidden" />
    </div>
  );
}
