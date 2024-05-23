'use client';
import { formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import Image from 'next/image';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import ReactSlider from 'react-slider';
import { Button } from '@/components/ui/button';

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
      className="sticky bottom-0 left-0 mt-auto w-screen bg-white shadow-2xl shadow-black"
    >
      <div className="container flex gap-3 py-3">
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

          <div className="flex w-full items-center gap-2 text-xs font-light text-muted-foreground">
            <span>{formatDuration(position)}</span>
            <ReactSlider
              className="global-scrub h-1 w-full"
              thumbClassName="global-scrub-thumb"
              trackClassName="global-scrub-track"
              value={position && player.duration ? (position / player.duration) * 100 : 0}
              onChange={(value) => handleSeek((value / 100) * player.duration)}
            />
            <span>{formatDuration(player.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
