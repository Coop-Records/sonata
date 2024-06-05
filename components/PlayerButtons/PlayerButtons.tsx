import { Button } from '@/components/ui/button';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import { useFeedProvider } from '@/providers/FeedProvider';
import { TrackMetadata } from '@/types/Track';
import Image from 'next/image';
import { useEffect } from 'react';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';

type PlayerButtonProps = {
  metadata?: TrackMetadata;
};

const PlayerButtons = ({ metadata }: PlayerButtonProps) => {
  const [player, dispatch] = usePlayer();
  const { handleNext, handlePrev } = useFeedProvider();

  useEffect(() => {
    if (player.position !== 0 && player.position > player.duration - 1000) {
      handleNext();
    }
  }, [player.position]);

  const handlePlay = () => {
    {
      metadata && dispatch({ type: 'RESUME', payload: { id: metadata.id } });
    }
  };

  const handlePause = () => {
    {
      metadata && dispatch({ type: 'PAUSE', payload: { id: metadata.id } });
    }
  };

  return (
    <div className="flex items-center">
      <Button onClick={handlePrev} className="bg-white">
        <Image src="/images/skip-back.png" width={22} height={22} alt="" />
      </Button>

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
      <Button onClick={handleNext} className="bg-white">
        <Image src="/images/skip-forward.png" width={22} height={22} alt="" />
      </Button>
    </div>
  );
};

export default PlayerButtons;
