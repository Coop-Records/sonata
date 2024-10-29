'use client';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import Image from 'next/image';
import Scrubber from '@/components/Scrubber';
import PlayerButtons from './PlayerButtons';
import { useUi } from '@/providers/UiProvider';
import { cn } from '@/lib/utils';

export default function GlobalPlayer() {
  const { isMobile } = useUi();
  const [player] = usePlayer();
  const { metadata } = player;

  if (!metadata) return <></>;

  return (
    <div
      data-type={metadata.type}
      className="sticky bottom-0 left-0 mt-auto w-screen space-y-6 overflow-hidden bg-background py-3 shadow-2xl shadow-black"
    >
      <div className="container relative flex items-center gap-2">
        <div className="relative my-auto size-8 overflow-hidden rounded-lg shadow-md">
          <Image
            src={metadata.artworkUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            unoptimized
          />
        </div>

        <div className={cn(isMobile ? 'grow space-y-2' : 'space-y-0.5 max-w-[33%]')}>
          <div className={cn('text-sm leading-none', isMobile ? 'line-clamp-1' : 'line-clamp-2')}>
            {metadata.trackName}
          </div>

          {isMobile ? (
            <Scrubber className="w-full" />
          ) : (
            <div className="line-clamp-2 text-xs font-extralight text-secondary-foreground">
              {metadata.artistName}
            </div>
          )}
        </div>
        <div className={cn(!isMobile && 'grow')}>
          <div className="ml-6 flex max-w-2xl grow flex-col items-center gap-1 md:gap-3">
            {metadata && <PlayerButtons metadata={metadata} />}
            {!isMobile && <Scrubber className="w-full" />}
          </div>
        </div>
      </div>
    </div>
  );
}
