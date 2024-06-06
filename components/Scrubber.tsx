'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import { cn, formatDuration } from '@/lib/utils';

export default function Scrubber({ className }: { className?: string }) {
  const [player, dispatch] = usePlayer();
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [lastSeen, setLastSeen] = useState(0);
  const [scrubbingPosition, setScrubbingPosition] = useState(0);

  const handleSeek = (value: number) => {
    dispatch({ type: 'SEEK', payload: { position: value } });
  };

  useEffect(() => {
    if (!isSeeking) return;
    if (player.position !== lastSeen) {
      setIsSeeking(false);
    }
  }, [isSeeking, lastSeen, player.position]);

  return (
    <div
      className={cn('flex items-center gap-2 text-xs font-light text-muted-foreground', className)}
    >
      <span>{formatDuration(player.position)}</span>
      <Slider
        defaultValue={[0]}
        max={player.duration}
        step={1}
        value={[isScrubbing || isSeeking ? scrubbingPosition : player.position]}
        onPointerDown={() => {
          setIsScrubbing(true);
          setScrubbingPosition(player.position);
        }}
        onPointerUp={() => {
          setIsScrubbing(false);
          setIsSeeking(true);
          setLastSeen(player.position);
          handleSeek(scrubbingPosition);
        }}
        onValueChange={([value]) => {
          setScrubbingPosition(value);
        }}
        className="cursor-pointer"
      />
      <span>{formatDuration(player.duration)}</span>
    </div>
  );
}
