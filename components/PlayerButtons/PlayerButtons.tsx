import { Button } from '@/components/ui/button';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import { useFeedProvider } from '@/providers/FeedProvider';
import { TrackMetadata } from '@/types/Track';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { RiPauseFill, RiPlayFill, RiSkipForwardFill, RiSkipBackFill } from 'react-icons/ri';

type PlayerButtonProps = {
  metadata?: TrackMetadata;
};

const PlayerButtons = ({ metadata }: PlayerButtonProps) => {
  const { hash, songLink } = useParams();
  const [player, dispatch] = usePlayer();
  const { handleNext, handlePrev } = useFeedProvider();
  const id = metadata?.id;
  const showActions = !(hash || songLink);

  useEffect(() => {
    if (player.position !== 0 && player.position >= player.duration) {
      if (showActions) handleNext();
      else handlePause();
    }
  }, [player.position]);

  const handlePlay = () => id && dispatch({ type: 'RESUME', payload: { id } });
  const handlePause = () => id && dispatch({ type: 'PAUSE', payload: { id } });

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {showActions && (
        <RiSkipBackFill onClick={handlePrev} className="cursor-pointer text-lg md:text-2xl" />
      )}
      <Button
        onClick={player.playing ? handlePause : handlePlay}
        variant="secondary"
        className="aspect-square h-auto rounded-full p-2 md:p-3"
      >
        {player.playing ? (
          <RiPauseFill className="text-lg md:text-2xl" />
        ) : (
          <RiPlayFill className="text-lg md:text-2xl" />
        )}
      </Button>
      {showActions && (
        <RiSkipForwardFill onClick={handleNext} className="cursor-pointer text-lg md:text-2xl" />
      )}
    </div>
  );
};

export default PlayerButtons;
