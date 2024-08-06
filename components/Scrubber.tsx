'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import { cn, formatDuration } from '@/lib/utils';

export default function Scrubber({ className }: { className?: string }) {
  const [player, dispatch] = usePlayer();
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [lastSeen, setLastSeen] = useState(0);
  const [scrubbingPosition, setScrubbingPosition] = useState(0);

  const displayPosition = isScrubbing || isSeeking ? scrubbingPosition : player.position;
  const visualisationContainer = useRef<HTMLDivElement>(null);

  const containerWidth = visualisationContainer?.current?.getBoundingClientRect()?.width;
  const visualisationData = useMemo<number[]>(() => {
    if (!(containerWidth && player.feedId)) return [];
    const barCount = Math.floor(containerWidth / 6);
    return new Array(barCount).fill(0).map(() => Number((Math.random() * 0.5 + 0.5).toFixed(2)));
  }, [containerWidth, player.feedId]);

  const currentBarIdx = useMemo(
    () => Math.floor((displayPosition / player.duration) * visualisationData.length),
    [displayPosition, player.duration, visualisationData.length],
  );

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
      <span className="w-10">{formatDuration(displayPosition)}</span>
      <div className="relative flex h-3 grow items-center">
        <div
          className="absolute left-0 top-0 flex size-full items-end gap-[3px]"
          ref={visualisationContainer}
        >
          {visualisationData.map((h, idx) => (
            <span
              key={`bar-${idx}`}
              className={cn(
                'rounded-full w-[3px]',
                idx <= currentBarIdx ? 'bg-black' : 'bg-gray-200',
              )}
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>

        <Slider
          defaultValue={[0]}
          max={player.duration}
          step={1}
          value={[displayPosition]}
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
          className="z-10 cursor-pointer opacity-0"
        />
      </div>

      <span className="w-10 text-right">{formatDuration(player.duration)}</span>
    </div>
  );
}
